<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\TeamsController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UsersController;
use App\Http\Middleware\ApiTokenCheckMiddleware;
use Illuminate\Support\Facades\Route;


Route::post('register', [AuthController::class, 'register'])->name('register');
Route::post('login', [AuthController::class, 'login'])->name('login');

Route::middleware([ApiTokenCheckMiddleware::class])->group(function() {  
    Route::post('user-info', [UserController::class, 'info']);
    Route::post('home/project', [HomeController::class,'getProjectsData']);
    Route::post('home/team', [HomeController::class, 'getTeamData']);
    Route::post('users', [UsersController::class, 'show']);
    Route::post('teams', [TeamsController::class, 'show']);
});
