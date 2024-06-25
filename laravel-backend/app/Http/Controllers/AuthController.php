<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\events;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;
class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'payer'=> 'required|string|max:255',
            'phone'=>'required|string|max:14',
            'date_of_birth'=>'required|date',
            'address'=>'required|string|max:255',

        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'payer'=> $request->payer,
            'phone'=>$request->phone,
            'date_of_birth'=>$request->date_of_birth,
            'address'=>$request->address,
        ]);

        return response()->json(['message' => 'User registered successfully!'], 201);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json(['message' => 'Invalid login details'], 401);
        }

        $user = Auth::user();
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json(['access_token' => $token, 'token_type' => 'Bearer']);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'User logged out successfully']);
    }

    public function getAllEvents()
    {
        $events = events::with('creator')->get();

        return response()->json($events);
    }





    public function userEvents(Request $request)
    {

        $user = Auth::user();
        $events = $user->eventsCreated;

        return response()->json($events);
    }









    public function createEvent(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'start_datetime' => 'required|date',
            'lient_event' => 'required|string|max:255',
            'prix' => 'required|integer',
            'nm_max' => 'required|integer',
            'gender' => 'required|string|max:1',
        ]);

        $event = events::create([
            'name' => $request->name,
            'start_datetime' => $request->start_datetime,
            'lient_event' => $request->lient_event,
            'prix' => $request->prix,
            'created_by' => Auth::id(),
            'nm_max' => $request->nm_max,
            'gender' => $request->gender,
        ]);

        return response()->json($event, 201);
    }

    public function update(Request $request, $id)
    {
        $event = events::findOrFail($id);

        $request->validate([
            'name' => 'required|string|max:255',
            'start_datetime' => 'required|date',
            'lient_event' => 'required|string|max:255',
            'prix' => 'required|numeric',
            'nm_max' => 'required|integer',
            'nm_participer' => 'required|integer',
            'gender' => 'required|string|in:H,F,-',
        ]);


        try {
            $event = events::findOrFail($id);
            $event->update($request->all());

            return response()->json(['message' => 'Event updated successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to update event', 'message' => $e->getMessage()], 500);
        }}


        public function deleteEvent($id)
        {
            $event = events::find($id);

            if (!$event) {
                return response()->json(['message' => 'Event not found'], 404);
            }

            try {
                $event->delete();
                return response()->json(['message' => 'Event deleted successfully'], 200);
            } catch (\Exception $e) {
                return response()->json(['message' => 'Failed to delete event', 'error' => $e->getMessage()], 400);
            }
        }






}
