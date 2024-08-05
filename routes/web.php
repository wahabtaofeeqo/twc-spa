<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', 'PagesController@index')->name('index');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth'])->group(function () {
    Route::get('/users', 'PagesController@users')->name('users');
    Route::get('/users/confirm/{id}', 'PagesController@confirm');
    Route::get('/admins', 'PagesController@admins')->name('admins');
    Route::get('/dashboard', 'PagesController@dashboard')->name('dashboard');
    Route::put('/users/{id}', 'PagesController@updateUser')->name('user.update');

    // Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    // Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    // Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::post('/create-user', 'Auth\RegisteredUserController@store')->name('user.create');
    Route::post('/create-admin', 'Auth\RegisteredUserController@storeAdmin')->name('admin.create');
});


require __DIR__.'/auth.php';
