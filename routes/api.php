<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\VehicleController;

Route::apiResource('vehicles', VehicleController::class);