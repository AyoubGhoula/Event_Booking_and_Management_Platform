<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\events;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Validation\ValidationException;
use App\Notifications\EmailVerificationCode;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required|string|max:255',
                'first_name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|min:8',
                'phone' => 'nullable|string|max:15',
                'role' => 'required|string|in:participant,admin,organizer',
                'avatar' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            ]);

            // Generate verification code
            $verificationCode = str_pad(random_int(0, 9999), 4, '0', STR_PAD_LEFT);

            // Create the user
            $user = new User();
            $user->name = $request->name;
            $user->first_name = $request->first_name;
            $user->email = $request->email;
            $user->password = Hash::make($request->password);
            $user->phone = $request->phone;
            $user->role = $request->role;
            $user->verification_code = $verificationCode;
            $user->code_expires_at = now()->addMinutes(15);
            $user->save();

            // Handle organizer-specific data
            if ($request->role === 'organizer') {
                $avatarPath = null;
                if ($request->hasFile('avatar')) {
                    $avatarPath = $request->file('avatar')->store('avatars', 'public');
                }

                $user->organisateur()->create([
                    'nom_organisation' => $request->nom_organisation,
                    'site_web_organisation' => $request->site_web_organisation ?? null,
                    'compte_valide' => false,
                    'avatar' => $avatarPath,
                ]);
            } elseif ($request->role === 'participant') {
                $user->participant()->create([]);
            } elseif ($request->role === 'admin') {
                $user->admin()->create([]);
            }

            // Send verification code
            $user->notify(new EmailVerificationCode($verificationCode));

            return response()->json([
                'message' => 'Registration successful. Please check your email for verification code.',
                'email' => $user->email
            ], 201);

        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validation Error',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Registration failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function verifyEmail(Request $request)
    {
        try {
            $request->validate([
                'email' => 'required|email',
                'code' => 'required|string|size:4'
            ]);

            $user = User::where('email', $request->email)
                       ->where('verification_code', $request->code)
                       ->where('code_expires_at', '>', now())
                       ->first();

            if (!$user) {
                return response()->json([
                    'message' => 'Invalid or expired verification code'
                ], 400);
            }

            $user->email_verified = true;
            $user->actif = true;
            $user->verification_code = null;
            $user->code_expires_at = null;
            $user->save();

            return response()->json([
                'message' => 'Email verified successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Verification failed',
                'error' => $e->getMessage()
            ], 400);
        }
    }

    public function resendVerificationCode(Request $request)
    {
        try {
            $request->validate([
                'email' => 'required|email'
            ]);

            $user = User::where('email', $request->email)
                       ->where('email_verified', false)
                       ->first();

            if (!$user) {
                return response()->json([
                    'message' => 'User not found or already verified'
                ], 404);
            }

            // Generate new verification code
            $verificationCode = str_pad(random_int(0, 9999), 4, '0', STR_PAD_LEFT);
            
            $user->verification_code = $verificationCode;
            $user->code_expires_at = now()->addMinutes(15);
            $user->save();

            // Send new verification code
            $user->notify(new EmailVerificationCode($verificationCode));

            return response()->json([
                'message' => 'New verification code sent'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to resend code',
                'error' => $e->getMessage()
            ], 400);
        }
    }

    public function login(Request $request)
    {
        try {
            $request->validate([
                'email' => 'required|string|email',
                'password' => 'required|string',
            ]);

            if (!Auth::attempt($request->only('email', 'password'))) {
                return response()->json(['message' => 'Invalid login details'], 401);
            }

            $user = Auth::user();

            if (!$user->email_verified) {
                return response()->json([
                    'message' => 'Please verify your email first',
                    'email' => $user->email,
                    'verified' => false
                ], 200);
            }

            $token = $user->createToken('auth_token')->plainTextToken;
            
            $user->actif = true;
            $user->save();

            return response()->json([
                'access_token' => $token,
                'token_type' => 'Bearer',
                'role' => $user->role,
            ], 200);

        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validation Error',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Something went wrong',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function logout(Request $request)
    {
        try {
            // tern the user inactif
            $request->user()->actif = false;
            $request->user()->save();
            $request->user()->currentAccessToken()->delete();
            return response()->json(['message' => 'User logged out successfully']);
            } catch (\Exception $e) {
                return response()->json(['message' => 'Failed to logout user', 'error' => $e->getMessage()], 400);
            }

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
