<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Notification;
use App\Models\Reservation;
use Illuminate\Support\Facades\Auth;

class NotificationController extends Controller
{
    //
    public function EventDeletedNotification(Request $request)
    {
        try{
        // Get the event's reservations
        $reservations = Reservation::where('evenement_id', $request->id)->with('participant')->get();

        // Create notifications for each participant
        foreach ($reservations as $reservation) {
            Notification::create([
                'name_evenement' => $request->name,
                'type' => 'Event Deleted',
                'contenu' => "The event '{$request->name}' has been deleted",
                'envoye_le' => now(),
                'destinataire_id' => $request->organisateur->id,
                'participant_id' => $reservation->participant->id
            ]);
        }

        return response()->json(['message' => 'Event deletion notifications sent successfully']);
    }
    catch(\Exception $e){
        return response()->json(['message' => 'Failed to send event deletion notifications', 'error' => $e->getMessage()], 400);
    }
    }

    public function EventUpdatedNotification(Request $request)
    {
        try{
        // Get the event's reservations
        $reservations = Reservation::where('evenement_id', $request->id)->with('participant')->get();

        // Create notifications for each participant
        foreach ($reservations as $reservation) {
            Notification::create([
                'name_evenement' => $request->name,
                'type' => 'Event Updated',
                'contenu' => "The event '{$request->name}' has been updated. Please check the new details.",
                'envoye_le' => now(),
                'destinataire_id' => $request->organisateur->id,
                'participant_id' => $reservation->participant->id
            ]);
        }

        return response()->json(['message' => 'Event update notifications sent successfully']);
        }
        catch(\Exception $e){
            return response()->json(['message' => 'Failed to send event update notifications', 'error' => $e->getMessage()], 400);
        }
    }

    public function EventNotification(Request $request)
    {
        try{
        // Validate request
        $request->validate([
            'name_evenement' => 'required|string',
            'user_ids' => 'required|array',
            'user_ids.*' => 'exists:participants,id',
            'event_id' => 'required|exists:evenements,id',
            'type' => 'required|string',
            'contenu' => 'required|string'
        ]);

        // Create notifications for each user in the list
        foreach ($request->user_ids as $userId) {
            Notification::create([
                'name_evenement' => $request->name_evenement,
                'type' => $request->type,
                'contenu' => $request->contenu,
                'envoye_le' => now(),
                'destinataire_id' => Auth::user()->organisateur->id,
                'participant_id' => $userId
            ]);
        }

        return response()->json([
            'message' => 'Notifications sent successfully',
            'count' => count($request->user_ids)
        ]);
        }
        catch(\Exception $e){
            return response()->json(['message' => 'Failed to send notifications', 'error' => $e->getMessage()], 400);
        }
    }

    public function getNotifications()
    {
        try {
            // Get the authenticated user's notifications
            $notifications = Notification::where('participant_id', Auth::user()->participant->id)->get();

            return response()->json($notifications);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to get notifications', 'error' => $e->getMessage()], 400);
        }
    }
}
