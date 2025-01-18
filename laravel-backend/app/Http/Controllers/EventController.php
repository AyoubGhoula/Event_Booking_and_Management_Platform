<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Evenement;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\NotificationController;

class EventController extends Controller
{

    public function createEvent(Request $request)
    {
        try {
        $request->validate([
            'titre'=> 'required|string|max:255',
            'type'=> 'required|string|max:255',
            'description'=> 'required|string',
            'lieu'=> 'required|string',
            'map_link'=> 'required|string',
            'date_debut'=> 'required|date',
            'date_fin'=> 'required|date',
            'nb_max_participants'=> 'required|integer',
            'prix'=> 'required|integer',
            'image'=> 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048'
        ]);

        $organisateur_id = Auth::user()->organisateur->id;
        $event = new Evenement();
        $event->titre = $request->input('titre');
        $event->type = $request->input('type');
        $event->description = $request->input('description');

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('storage/images'), $imageName);
            $event->image = $imageName;
        }
        // $event->image = "test.jpg";
        $event->lieu = $request->input('lieu');
        $event->map_link = $request->input('map_link');
        $event->date_debut = $request->input('date_debut');
        $event->date_fin = $request->input('date_fin');
        $event->nb_max_participants = $request->input('nb_max_participants');
        $event->organisateur_id = $organisateur_id;
        $event->prix = $request->input('prix');
        $event->save();

        return response()->json($event, 201);
    } catch (\Exception $e) {
        return response()->json(['message' => 'Failed to create event', 'error' => $e->getMessage()], 400);

    }
}
public function getAllEvents()
    {
        try {
            //get all events with their creator
            $events = Evenement::with('organisateur')->get();

            return response()->json($events);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to get events', 'error' => $e->getMessage()], 400);
        }
    }
public function updateEvent(Request $request, $id)
    {
        try {
            $event = Evenement::findOrFail($id);

            // Update event fields
            $event->titre = $request->input('titre') ?? $event->titre;
            $event->type = $request->input('type') ?? $event->type;
            $event->description = $request->input('description') ?? $event->description;
            if ($request->hasFile('image')) {
                $image = $request->file('image');
                $imageName = time() . '.' . $image->getClientOriginalExtension();
                $image->move(public_path('storage/images'), $imageName);
                $event->image = $imageName;
            }
            $event->lieu = $request->input('lieu') ?? $event->lieu;
            $event->map_link = $request->input('map_link') ?? $event->map_link;
            $event->date_debut = $request->input('date_debut') ?? $event->date_debut;
            $event->date_fin = $request->input('date_fin') ?? $event->date_fin;
            $event->nb_max_participants = $request->input('nb_max_participants') ?? $event->nb_max_participants;
            $event->prix = $request->input('prix') ?? $event->prix;
            $event->save();

            // Send notifications using NotificationController
            $notificationController = new NotificationController();
            $notificationRequest = new Request([
                'id' => $event->id,
                'name' => $event->titre,
                'organisateur' => Auth::user()->organisateur
            ]);
            $notificationController->EventUpdatedNotification($notificationRequest);

            return response()->json($event);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to update event', 'error' => $e->getMessage()], 400);
        }
    }
public function deleteEvent($id)
    {
        try {
            $event = Evenement::findOrFail($id);

            // Store event details before deletion for notification
            $eventName = $event->titre;

            // Send notifications using NotificationController
            $notificationController = new NotificationController();
            $notificationRequest = new Request([
                'id' => $event->id,
                'name' => $event->titre,
                'organisateur' => Auth::user()->organisateur
            ]);
            $notificationController->EventDeletedNotification($notificationRequest);


            // Delete the event
            $event->delete();

            // Send notifications after successful deletion
           
            return response()->json(['message' => 'Event deleted successfully']);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to delete event', 'error' => $e->getMessage()], 400);
        }
    }

    public function getParticipantEvents()
    {
        try {
            $participant = Auth::user()->participant;

            // Get upcoming events where the participant has reservations
            $events = Evenement::where('date_debut', '>=', now())
            ->with(['organisateur.user' => function($query) {
                $query->select('id', 'name', 'first_name', 'email');
            }])
            ->select(
                'id',
                'titre',
                'type',
                'description',
                'date_debut',
                'date_fin',
                'lieu',
                'nb_max_participants',
                'nb_participants',
                'organisateur_id',
                'prix',
                'image'
            )
            ->orderBy('date_debut', 'asc')
            ->get()
            ->map(function($event) {
                return [
                    'id' => $event->id,
                    'title' => $event->titre,
                    'type' => $event->type,
                    'description' => $event->description,
                    'start_date' => $event->date_debut,
                    'end_date' => $event->date_fin,
                    'lieu' => $event->lieu,
                    'map_link' => $event->map_link,
                    'max_participants' => $event->nb_max_participants,
                    'current_participants' => $event->nb_participants,
                    'organizer' => [
                        'name' => $event->organisateur->user->name,
                        'first_name' => $event->organisateur->user->first_name,
                        'email' => $event->organisateur->user->email,
                        'avatar' => $event->organisateur ? url('storage/'.$event->organisateur->avatar) : null,
                        'nom_organisation' => $event->organisateur ? $event->organisateur->nom_organisation : null,
                        'site_web_organisation' => $event->organisateur->site_web_organisation
                    ],
                    'prix' => $event->prix,
                    'image' => url('storage/images/'.$event->image)
                ];
            });

            return response()->json([
                'message' => 'Events retrieved successfully',
                'data' => $events
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to retrieve events',
                'error' => $e->getMessage()
            ], 400);
        }
    }

public function getEventparticipants()
{

    try {
        $event = Evenement::findOrFail($id);

        // Store event details before deletion for notification
        $eventName = $event->titre;

        // Send notifications using NotificationController
        $notificationController = new NotificationController();
        $notificationRequest = new Request([
            'id' => $event->id,
            'name' => $eventName,
            'organisateur' => Auth::user()->organisateur
        ]);

        // Delete the event
        $event->delete();

        // Send notifications after successful deletion
        $notificationController->EventDeletedNotification($notificationRequest);

        return response()->json(['message' => 'Event deleted successfully']);
    } catch (\Exception $e) {
        return response()->json(['message' => 'Failed to delete event', 'error' => $e->getMessage()], 400);
    }
}

public function getpastParticipantEvent()
{
    try {
        $participant = Auth::user()->participant;

        // Get upcoming events where the participant has reservations
        $events = Evenement::where('date_debut', '<', now())
        ->whereHas('reservations', function($query) use ($participant) {
            $query->where('participant_id', $participant->id);
        })
        ->with(['organisateur.user' => function($query) {
            $query->select('id', 'name', 'first_name', 'email');
        }])
        ->select(
            'id',
            'titre',
            'type',
            'description',
            'date_debut',
            'date_fin',
            'lieu',
            'nb_max_participants',
            'nb_participants',
            'organisateur_id',
            'prix',
            'image'
        )
        ->orderBy('date_debut', 'asc')
        ->get()
        ->map(function($event) {
            return [
                'id' => $event->id,
                'title' => $event->titre,
                'type' => $event->type,
                'description' => $event->description,
                'start_date' => $event->date_debut,
                'end_date' => $event->date_fin,
                'lieu' => $event->lieu,
                'map_link' => $event->map_link,
                'max_participants' => $event->nb_max_participants,
                'current_participants' => $event->nb_participants,
                'organizer' => [
                    'name' => $event->organisateur->user->name,
                    'first_name' => $event->organisateur->user->first_name,
                    'email' => $event->organisateur->user->email,
                    'avatar' => url('storage/'.$event->organisateur->avatar),
                    'nom_organisation' => $event->organisateur->nom_organisation,
                    'site_web_organisation' => $event->organisateur->site_web_organisation
                ],
                'prix' => $event->prix,
                'image' => url('storage/images/'.$event->image)
            ];
        });

        return response()->json([
            'message' => 'Events retrieved successfully',
            'data' => $events
        ]);

    } catch (\Exception $e) {
        return response()->json([
            'message' => 'Failed to retrieve events',
            'error' => $e->getMessage()
        ], 400);
    }


}
public function getupcomingParticipantEvent()
{
    try {
        $participant = Auth::user()->participant;

        // Get upcoming events where the participant has reservations
        $events = Evenement::where('date_debut', '>=', now())
        ->whereHas('reservations', function($query) use ($participant) {
            $query->where('participant_id', $participant->id);
        })
        ->with(['organisateur.user' => function($query) {
            $query->select('id', 'name', 'first_name', 'email');
        }])
        ->select(
            'id',
            'titre',
            'type',
            'description',
            'date_debut',
            'date_fin',
            'lieu',
            'nb_max_participants',
            'nb_participants',
            'organisateur_id',
            'prix',
            'image'
        )
        ->orderBy('date_debut', 'asc')
        ->get()
        ->map(function($event) {
            return [
                'id' => $event->id,
                'title' => $event->titre,
                'type' => $event->type,
                'description' => $event->description,
                'start_date' => $event->date_debut,
                'end_date' => $event->date_fin,
                'lieu' => $event->lieu,
                'map_link' => $event->map_link,
                'max_participants' => $event->nb_max_participants,
                'current_participants' => $event->nb_participants,
                'organizer' => [
                    'name' => $event->organisateur->user->name,
                    'first_name' => $event->organisateur->user->first_name,
                    'email' => $event->organisateur->user->email,
                    'avatar' =>  url('storage/'.$event->organisateur->avatar),
                    'nom_organisation' => $event->organisateur->nom_organisation,
                    'site_web_organisation' => $event->organisateur->site_web_organisation
                ],
                'prix' => $event->prix,
                'image' => url('storage/images/'.$event->image)
            ];
        });

        return response()->json([
            'message' => 'Events retrieved successfully',
            'data' => $events
        ]);

    } catch (\Exception $e) {
        return response()->json([
            'message' => 'Failed to retrieve events',
            'error' => $e->getMessage()
        ], 400);
    }


}

    public function getOrganizerEvents()
    {
        try {
            $organizer = Auth::user()->organisateur;

            // Get all events created by the organizer
            $events = Evenement::where('organisateur_id', $organizer->id)
            ->select(
                'id',
                'titre',
                'description',
                'date_debut',
                'date_fin',
                'lieu',
                'nb_max_participants',
                'nb_participants',
                'prix',
                'image',
                'type',
                'map_link'
            )
            ->withCount('reservations')
            ->orderBy('date_debut', 'desc')
            ->get()
            ->map(function($event) use ($organizer) {
                return [
                    'id' => $event->id,
                    'title' => $event->titre,
                    'description' => $event->description,
                    'start_date' => $event->date_debut,
                    'end_date' => $event->date_fin,
                    'lieu' => $event->lieu,
                    'max_participants' => $event->nb_max_participants,
                    'current_participants' => $event->nb_participants,
                    'total_reservations' => $event->reservations_count,
                    'available_places' => $event->nb_max_participants - $event->nb_participants,
                    'status' => now() > $event->date_fin ? 'past' :
                              (now() < $event->date_debut ? 'upcoming' : 'ongoing'),
                    'is_full' => $event->nb_participants >= $event->nb_max_participants,
                    'prix' => $event->prix,
                    'avatar' => url('storage/'.$organizer->avatar),
                    'site_web_organisation' => $organizer->site_web_organisation,
                    'image' => url('storage/images/'.$event->image),
                    'type' => $event->type,
                    'nom_organisation' => $organizer->nom_organisation,
                    'map_link' => $event->map_link
                      ];
            });

            // Group events by status
            // $groupedEvents = [
            //     'upcoming' => $events->where('status', 'upcoming')->values(),
            //     'ongoing' => $events->where('status', 'ongoing')->values(),
            //     'past' => $events->where('status', 'past')->values()
            // ];

            return response()->json([
                'message' => 'Events retrieved successfully',
                'data' => $events
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to retrieve events',
                'error' => $e->getMessage()
            ], 400);
        }
    }
}
