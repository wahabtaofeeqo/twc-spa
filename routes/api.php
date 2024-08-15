<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('scans', 'ScanController@scan')->name('scans.scan');
Route::post('charge', 'ScanController@charge')->name('charge');
