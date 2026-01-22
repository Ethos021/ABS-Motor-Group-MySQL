<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Vehicle;

class BrowseController extends Controller
{
    public function index()
    {
        $vehicles = Vehicle::all(); // or paginate

        return Inertia::render('Browse', [
            'vehicles' => $vehicles
        ]);
    }
}
