<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OrganizerController extends Controller
{
    public function getOrganizerInfo()
    {
        $user = Auth::user();
        $organizer = $user->organisateur;

        if ($organizer) {
            return response()->json([
                'name' => $user->name,
                'first_name' => $user->first_name,
                'email' => $user->email,
                'avatar' => $organizer->avatar ? asset('storage/' . $organizer->avatar) : null,
                'nom_organisation' => $organizer->nom_organisation,
                'site_web_organisation' => $organizer->site_web_organisation,
            ]);
        }

        return response()->json(['message' => 'Organizer not found'], 404);
    }
}
