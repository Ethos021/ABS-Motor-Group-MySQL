<?php
use App\Http\Controllers\Api\VehicleController;

Route::get('/vehicles', [VehicleController::class, 'index']);
