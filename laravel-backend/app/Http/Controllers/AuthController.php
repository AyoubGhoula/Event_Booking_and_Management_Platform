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
    public function register(Request $request) {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'phone' => 'nullable|string|max:15',
            'payer' => 'required|string',
            'avatar' => 'nullable|file|image|max:2048',
            'date_of_birth' => 'nullable|date',
            'address' => 'nullable|string|max:255',
            'role' => 'required|string|in:participant,admin,organizer'
        ]);

        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $user->phone = $request->phone;
        $user->payer = $request->payer;
        if ($request->hasFile('avatar')) {
            $user->avatar = $request->file('avatar')->store('avatars', 'public');
        }
        $user->date_of_birth = $request->date_of_birth;
        $user->address = $request->address;
        $user->role = $request->role;
        $user->save();

        return response()->json(['message' => 'User registered successfully'], 201);
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
    public function getAllUser()
{
    $users = User::all();

    return response()->json($users);
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

        public function deleteUser($id)
        {
            $user=user::find($id);
            if(!$user){
                return response()->json(['message'=>'user not found'],404);
            }

            try {
                $user->delete();
                return response()->json(['message'=>'User deleted successfully'],200);
            }catch (\Exception $e){
                return response()->json(['message'=>'Failed to delete User','error' =>$e->getMessage()],400);
            }
        }

        public function getUser()
    {
        $user = Auth::user();

        $user->avatar = $user->avatar ? asset('storage/avatars/' . $user->avatar) : null;

        return response()->json($user);
    }


     public function getevents()
     {

        $events = events::all();
        return response()->json($events);

     }

     public function search(Request $request)
     {
         $query = $request->input('query');

         if ($query) {
             $events = events::where('name', 'LIKE', "%{$query}%")->get();
         } else {
             $events = events::all();
         }

         return response()->json($events);
     }


     public function getCounts()
     {
        $userCount = user::count();
        $organizerCount = user::where('role', 'Organizer')->count();
        $eventCount = events::count();

        return response()->json([
            'userCount' => $userCount,
            'organizerCount' => $organizerCount,
            'eventCount' => $eventCount,
        ]);
    }

}
