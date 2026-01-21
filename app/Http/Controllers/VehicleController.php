<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Vehicle;
use Illuminate\Http\Request;

class VehicleController extends Controller
{
    // List all vehicles (for HeroSection)
   public function index()
    {
        return response()->json(Vehicle::all());
    }

    // Search vehicles (Browse page)
    public function search(Request $request)
    {
        $query = Vehicle::query();

        if ($request->filled('make')) {
            $query->where('make', $request->make);
        }

        if ($request->filled('priceMin') && $request->filled('priceMax')) {
            $query->whereBetween('price', [$request->priceMin, $request->priceMax]);
        }

        if ($request->filled('yearMin') && $request->filled('yearMax')) {
            $query->whereBetween('year', [$request->yearMin, $request->yearMax]);
        }

        if ($request->filled('kmMin') && $request->filled('kmMax')) {
            $query->whereBetween('km', [$request->kmMin, $request->kmMax]);
        }

        $vehicles = $query->get();

        return Inertia::render('Browse', [
            'vehicles' => $vehicles
        ]);
    }
}
