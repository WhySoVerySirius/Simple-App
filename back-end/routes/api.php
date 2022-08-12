<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\TeamsController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\ApiTokenCheckMiddleware;
use Illuminate\Support\Facades\Route;


Route::post('register', [AuthController::class, 'register'])->name('register');
Route::post('login', [AuthController::class, 'login'])->name('login');

Route::middleware([ApiTokenCheckMiddleware::class])->group(function() {  
    Route::post('user/info', [UserController::class, 'info']);
    Route::put('user/{id}/edit', [UserController::class, 'edit']);
    Route::post('user/show-users', [UserController::class, 'showUsers']);
    Route::post('home/project', [HomeController::class,'getProjectsData']);
    Route::post('home/team', [HomeController::class, 'getTeamData']);
    Route::post('home/messages', [HomeController::class, 'unreadMessages']);
    Route::post('home/messages/{id}/read', [HomeController::class, 'messageRead']);
    Route::post('messages/personal/send', [MessageController::class, 'sendPersonalMessage']);
    Route::post('messages/email/send', [MessageController::class, 'sendPersonalEmail']);
    Route::post('teams/all', [TeamsController::class, 'show']);
    Route::post('teams/selected', [TeamsController::class, 'showTeamExpanded']);

});
