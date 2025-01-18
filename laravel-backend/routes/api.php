<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\OrganizerController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/getAllUser',[AuthController::class, 'getAllUser']);


Route::post('register', [AuthController::class, 'register']);

Route::post('login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->post('logout', [AuthController::class, 'logout']);

Route::middleware('auth:sanctum')->get('user/events', [AuthController::class, 'userEvents']);

Route::middleware('auth:sanctum')->post('add_events', [EventController::class, 'createEvent']);

Route::middleware('auth:sanctum')->get('getAllEvents', [EventController::class, 'getAllEvents']);

Route::middleware('auth:sanctum')->post('editEvents/{id}', [EventController::class, 'updateEvent']);

Route::middleware('auth:sanctum')->delete('deleteEvent/{id}', [EventController::class, 'deleteEvent']);

Route::middleware('auth:sanctum')->get('/user',[AuthController::class, 'getUser'] );

Route::middleware('auth:sanctum')->put('/user', [AuthController::class, 'updateUser']);

Route::middleware('auth:sanctum')->put('/user/change-password', [AuthController::class, 'changePassword']);

Route::get('/allevents', [AuthController::class, 'getevents']);

Route::get('/search-events', [AuthController::class, 'search']);

Route::get('/users',[AuthController::class,'getUsers']);

Route::middleware('auth:sanctum')->delete('/deleteUser/{id}', [AuthController::class, 'deleteUser']);

Route::middleware('auth:sanctum')->get('/getCountsForAdmin',[AuthController::class, 'getCounts']);

Route::middleware('auth:sanctum')->post('reserveEvent',[ReservationController::class, 'reserveEvent']);

Route::middleware('auth:sanctum')->post('cancelReservation',[ReservationController::class, 'cancelReservation']);

Route::middleware('auth:sanctum')->get('organizer/reservations',[ReservationController::class, 'getReservationsForOrganizer']);

Route::middleware('auth:sanctum')->get('participant/upcoming-reservations',[EventController::class, 'getupcomingParticipantEvent']);

Route::middleware('auth:sanctum')->get('participant/past-reservations',[EventController::class, 'getPastParticipantEvent']);

Route::middleware('auth:sanctum')->get('event/{eventId}/all-reservations',[ReservationController::class, 'getAllEventReservations']);

Route::middleware('auth:sanctum')->get('event/{eventId}/my-reservations',[ReservationController::class, 'getParticipantEventReservations']);

Route::middleware('auth:sanctum')->get('event/{eventId}/participants',[ReservationController::class, 'getEventParticipants']);

Route::middleware('auth:sanctum')->get('participant/my-events',[EventController::class, 'getParticipantEvents']);

Route::middleware('auth:sanctum')->get('organizer/my-events',[EventController::class, 'getOrganizerEvents']);

Route::middleware('auth:sanctum')->post('organizer/{idrev}/cancelResOrg',[ReservationController::class, 'cancelResOrg']);

Route::middleware('auth:sanctum')->get('organizer/info', [OrganizerController::class, 'getOrganizerInfo']);

// Email Verification Routes
Route::post('/verify-email', [AuthController::class, 'verifyEmail']);
Route::post('/resend-verification', [AuthController::class, 'resendVerificationCode']);

Route::middleware('auth:sanctum')->get('getNotifications', [NotificationController::class, 'getNotifications']);
