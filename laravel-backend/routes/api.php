<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
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

Route::middleware('auth:sanctum')->post('add_events', [AuthController::class, 'createEvent']);

Route::middleware('auth:sanctum')->post('editEvents/{id}', [AuthController::class, 'update']);

Route::middleware('auth:sanctum')->delete('/deleteEvent/{id}', [AuthController::class, 'deleteEvent']);

Route::middleware('auth:sanctum')->get('/user',[AuthController::class, 'getUser'] );

Route::get('/allevents', [AuthController::class, 'getevents']);

Route::get('/search-events', [AuthController::class, 'search']);

Route::get('/users',[AuthController::class,'getUsers']);

Route::middleware('auth:sanctum')->delete('/deleteUser/{id}', [AuthController::class, 'deleteUser']);

Route::middleware('auth:sanctum')->get('/getCountsForAdmin',[AuthController::class, 'getCounts']);

