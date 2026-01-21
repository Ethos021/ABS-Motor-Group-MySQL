<?php
// app/Http/Controllers/WelcomeController.php
namespace App\Http\Controllers;

use App\Models\Vehicle;
use Inertia\Inertia;

class WelcomeController extends Controller
{
    public function index()
    {
        return Inertia::render('Welcome', [
            'vehicles' => Vehicle::all(),
        ]);
    }
}
