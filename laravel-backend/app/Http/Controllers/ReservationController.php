<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Evenement;
use App\Models\Reservation;
use App\Models\Participant;
use App\Models\User;
use App\Http\Controllers\NotificationController;
use Illuminate\Support\Facades\Auth;
use App\Models\Notification;


class ReservationController extends Controller
{
    public function reserveEvent(Request $request)
    {
        try {
            // Validate request
            $request->validate([
                'evenement_id' => 'required|exists:evenements,id',
                'reservations' => 'required|array|min:1',
                'reservations.*.full_name' => 'required|string|max:255',
                'reservations.*.email' => 'required|email|max:255',
                'reservations.*.numero_telephone' => 'required|string|max:20',
            ]);

            // Get the event
            $event = Evenement::findOrFail($request->evenement_id);

            // Check if event has enough space
            $currentParticipants = Reservation::where('evenement_id', $event->id)
                                            ->count();

            $requestedPlaces = count($request->reservations);

            if (($currentParticipants + $requestedPlaces) > $event->nb_max_participants) {
                return response()->json([
                    'message' => 'Not enough places available',
                    'available_places' => $event->nb_max_participants - $currentParticipants
                ], 400);
            }

            // Update event participants count
            $event->nb_participants = $currentParticipants + $requestedPlaces;
            $event->save();

            $createdReservations = [];

            // Create reservations
            foreach ($request->reservations as $reservationData) {
                // Generate unique code
                $uniqueCode = $this->generateUniqueCode();

                $reservation = new Reservation([
                    'participant_id' => Auth::user()->participant->id,
                    'evenement_id' => $event->id,
                    'Full_Name' => $reservationData['full_name'],
                    'email' => $reservationData['email'],
                    'numero_telephone' => $reservationData['numero_telephone'],
                    'code_unique' => $uniqueCode
                ]);

                $reservation->save();
                $createdReservations[] = $reservation;
            }

            // Send notification to event organizer


            return response()->json([
                'message' => 'Reservations created successfully',
                'reservations' => $createdReservations
            ]);

        } catch (\Exception $e) {
            // If there's an error, rollback the event participants count
            if (isset($event) && isset($requestedPlaces)) {
                $event->nb_participants = $currentParticipants;
                $event->save();
            }
            return response()->json([
                'message' => 'Failed to create reservations',
                'error' => $e->getMessage()
            ], 400);
        }
    }

    private function generateUniqueCode()
    {
        do {
            // Generate a random code (8 characters)
            $code = strtoupper(substr(md5(uniqid()), 0, 8));
        } while (Reservation::where('code_unique', $code)->exists());

        return $code;
    }

    public function cancelReservation(Request $request)
    {
        try {
            // Validate request
            $request->validate([
                'code_unique' => 'required|exists:reservations,code_unique'
            ]);

            // Get the reservation
            $reservation = Reservation::where('code_unique', $request->code_unique)->firstOrFail();

            // Check if the reservation belongs to the authenticated user
            if ($reservation->participant_id !== Auth::user()->participant->id) {
                return response()->json(['message' => 'Unauthorized to cancel this reservation'], 403);
            }

            // Get event details before canceling
            $event = $reservation->evenement;

            // Delete the reservation
            $reservation->delete();

            // Update event participants count
            $event->nb_participants = $event->nb_participants - 1;
            $event->save();

            // Send notification to event organizer
            // $notificationController = new NotificationController();
            // $notificationRequest = new Request([
            //     'user_ids' => [$event->organisateur_id],
            //     'event_id' => $event->id,
            //     'type' => 'Reservation Cancelled',
            //     'contenu' => 'A reservation has been cancelled for your event: ' . $event->titre,
            //     'organisateur' => $event->organisateur
            // ]);
            // $notificationController->EventNotification($notificationRequest);

            return response()->json([
                'message' => 'Reservation cancelled successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to cancel reservation', 'error' => $e->getMessage()], 400);
        }
    }

    public function getAllEventReservations($eventId)
    {
        try {
            // Get the event
            $event = Evenement::findOrFail($eventId);

            // Check if user is the organizer
            $user = Auth::user();
            if (!$user->organisateur || $event->organisateur_id !== $user->organisateur->id) {
                return response()->json(['message' => 'Unauthorized to view these reservations'], 403);
            }

            // Get all reservations for the event
            $reservations = Reservation::where('evenement_id', $eventId)
                ->select(
                    'id',
                    'participant_id',
                    'Full_Name',
                    'email',
                    'numero_telephone',
                    'code_unique',
                    'created_at'
                )
                ->orderBy('created_at', 'desc')
                ->get();

            $eventData = [
                    'total_reservations' => $reservations->count(),
                    'max_participants' => $event->nb_max_participants,
                    'available_places' => $event->nb_max_participants - $reservations->count(),
                    'reservations' => $reservations->map(function($reservation) {
                        return [
                            'id' => $reservation->id,
                            'full_name' => $reservation->Full_Name,
                            'email' => $reservation->email,
                            'phone' => $reservation->numero_telephone,
                            'code' => $reservation->code_unique,
                            'reserved_at' => $reservation->created_at->format('Y-m-d H:i:s'),
                            'code_unique' => $reservation->code_unique
                        ];
                })
            ];

            return response()->json([
                'message' => 'Event reservations retrieved successfully',
                'data' => $eventData
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to retrieve event reservations',
                'error' => $e->getMessage()
            ], 400);
        }
    }

    public function getParticipantEventReservations($eventId)
    {
        try {
            // Get the event
            $event = Evenement::findOrFail($eventId);

            // Get participant's reservations for this event
            $reservations = Reservation::where('evenement_id', $eventId)
                ->where('participant_id', Auth::user()->participant->id)
                ->select(
                    'id',
                    'Full_Name',
                    'email',
                    'numero_telephone',
                    'code_unique',
                    'created_at'
                )
                ->orderBy('created_at', 'desc')
                ->get();

            $eventData = [
                'event' => [
                    'id' => $event->id,
                    'name' => $event->titre,
                    'start_date' => $event->date_debut,
                    'end_date' => $event->date_fin,
                    'location' => $event->localisation
                ],
                'reservations' => $reservations->map(function($reservation) {
                    return [
                        'id' => $reservation->id,
                        'full_name' => $reservation->Full_Name,
                        'email' => $reservation->email,
                        'phone' => $reservation->numero_telephone,
                        'code' => $reservation->code_unique,
                        'reserved_at' => $reservation->created_at->format('Y-m-d H:i:s')
                    ];
                })
            ];

            return response()->json([
                'message' => 'Your reservations retrieved successfully',
                'data' => $eventData
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to retrieve your reservations',
                'error' => $e->getMessage()
            ], 400);
        }

    }

    public function getEventParticipants($eventId)
    {
        try {
            // Get the event
            $event = Evenement::findOrFail($eventId);

            // Check if the authenticated user is the organizer of the event
            $user = Auth::user();
            if (!$user->organisateur || $event->organisateur_id !== $user->organisateur->id) {
                return response()->json(['message' => 'Unauthorized to view these participants'], 403);
            }

            // Get unique participants for this event along with their user data
            $participants = Reservation::where('evenement_id', $eventId)
                ->with('participant.user') // Eager load participant and user relationships
                ->get()
                ->unique('participant_id')
                ->map(function ($reservation) {
                    $participant = $reservation->participant;
                    $user = $participant->user;

                    return [
                        'participant_id' => $participant->id,
                        'name' => $user->name,
                        'first_name' => $user->first_name,
                        'email' => $user->email
                    ];
                });

            // Prepare the response data
            $participantData = [
                'event' => [
                    'id' => $event->id,
                    'name' => $event->titre,
                    'total_participants' => $participants->count(),
                ],
                'participants' => $participants
            ];

            return response()->json([
                'message' => 'Event participants retrieved successfully',
                'data' => $participantData
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to retrieve event participants',
                'error' => $e->getMessage()
            ], 400);
        }
    }
    public function cancelResOrg($idrev){
        try {
            // Get the reservation
            $reservation = Reservation::findOrFail($idrev);
            // Get event details before canceling
            $event = $reservation->evenement;
            // sent a mail to the participant
            $participant = Participant::findOrFail($reservation->participant_id);
            $organisateur = $event->organisateur;

            // Create a notification for the participant
            Notification::create([
                'name_evenement' => $event->titre,
                'type' => 'Reservation Cancelled',
                'contenu' => 'Your reservation for the event: ' . $event->titre . ' has been cancelled for ' . $reservation->Full_Name . ' with email: ' . $reservation->email . ' and phone number: ' . $reservation->numero_telephone,
                'envoye_le' => now(),
                'destinataire_id' => $organisateur->id, // Ensure the correct destinataire_id is used
                'participant_id' => $reservation->participant_id
            ]);
            // Delete the reservation
            $reservation->delete();
            // Update event participants count
            $event->nb_participants = $event->nb_participants - 1;
            $event->save();

            return response()->json([
                'message' => 'Reservation cancelled successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to cancel reservation', 'error' => $e->getMessage()], 400);
        }
    }
}
