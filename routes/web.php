<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', 'PagesController@index')->name('index');

Route::middleware(['auth'])->group(function () {
    Route::get('/users/reset/{id}', 'PagesController@reset');
    Route::get('/users', 'PagesController@users')->name('users');
    Route::get('/users/confirm/{id}', 'PagesController@confirm');
    Route::get('/admins', 'PagesController@admins')->name('admins');
    Route::get('/dashboard', 'PagesController@dashboard')->name('dashboard');
    Route::put('/users/{id}', 'PagesController@updateUser')->name('user.update');

    // Outlets
    Route::get('outlets', 'OutletController@index')->name('outlets');
    Route::post('outlets', 'OutletController@store')->name('outlets.create');

    // Scanning
    Route::get('scans', 'ScanController@index')->name('scans');
    Route::post('charge', 'ScanController@charge')->name('charge');

    // Transaction
    Route::get('transactions', 'TransactionController@index')->name('transactions');

    //
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::post('/create-user', 'Auth\RegisteredUserController@store')->name('user.create');
    Route::post('/create-admin', 'Auth\RegisteredUserController@storeAdmin')->name('admin.create');
});


require __DIR__.'/auth.php';
