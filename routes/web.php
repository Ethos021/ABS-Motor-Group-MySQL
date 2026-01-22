<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\WelcomeController;
use App\Http\Controllers\ContactController;
// Route::get('/', [VehicleController::class, 'hero'])->name('home');
Route::get('/', [WelcomeController::class, 'index'])->name('welcome');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::get('/contact', function () {
    return Inertia::render('Contact'); // Match the exact file: resources/js/Pages/Contact.tsx
})->name('contact');
Route::post('/contact', [ContactController::class, 'store']);

Route::get('/about', function () {
    return Inertia::render('About');
})->name('about');

require __DIR__.'/settings.php';
