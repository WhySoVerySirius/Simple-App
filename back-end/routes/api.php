<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\FilesController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\ApiTokenCheckMiddleware;
use App\Http\Requests\PasswordResetRequest;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Route;


Route::post('register', [AuthController::class, 'register'])->name('register');
Route::post('login', [AuthController::class, 'login'])->name('login');
Route::post('/forgot-password', function (PasswordResetRequest $request) {
    $status = Password::sendResetLink($request->safe());
    return $status === Password::RESET_LINK_SENT
        ?['status' => 'success']
        :['status' => 'failure'];
});


Route::middleware([ApiTokenCheckMiddleware::class])->group(function() {  
    Route::post('user/info', [UserController::class, 'info']);
    Route::put('user/{id}/edit', [UserController::class, 'edit']);
    Route::post('user/{id}/image', [FilesController::class, 'uploadImage']);
    Route::post('user/show-users', [UserController::class, 'showUsers']);
    Route::post('home/project', [HomeController::class,'getProjectsData']);
    Route::post('home/team', [HomeController::class, 'getTeamData']);
    Route::post('home/messages', [HomeController::class, 'unreadMessages']);
    Route::post('home/messages/{id}/read', [HomeController::class, 'messageRead']);
    Route::post('messages/personal/send', [MessageController::class, 'sendPersonalMessage']);
    Route::post('messages/email/send', [MessageController::class, 'sendPersonalEmail']);
    Route::post('teams/all', [TeamController::class, 'show']);
    Route::post('teams/selected/members', [TeamController::class, 'selectedTeamMembers']);
    Route::post('teams/selected/team/messages', [MessageController::class, 'getTeamMessages']);
    Route::post('teams/selected/team/messages/send', [MessageController::class, 'sendTeamMessage']);
    Route::post('teams/selected/project/messages', [MessageController::class, 'getProjectMessages']);
    Route::post('teams/selected/project/messages/send', [MessageController::class, 'sendProjectMessage']);
    Route::post('project/files', [FilesController::class, 'getProjectFiles']);
    Route::post('project/upload/file', [FilesController::class, 'uploadFile']);
    Route::post('project/upload/link', [FilesController::class, 'uploadLink']);
    Route::post('project/download', [FilesController::class, 'downloadFile']);
    Route::post('admin/data', [AdminController::class, 'getData']);
    Route::post('admin/team/{teamId}/user/add', [AdminController::class, 'addUserToTeam']);
    Route::post('admin/team/{teamId}/user/remove', [AdminController::class, 'removeUserFromTeam']);
    Route::post('admin/project/{id}/change', [AdminController::class, 'changeProjectData']);
    Route::post('admin/team/{teamId}/project/remove', [AdminController::class, 'removeProjectFromTeam']);
    Route::post('admin/team/create', [AdminController::class, 'createTeam']);
    Route::post('admin/team/{teamId}/project/remove', [AdminController::class, 'removeProjectFromTeam']);
    Route::post('admin/project/{id}/team/assign' , [AdminController::class, 'assignProject']);
});


