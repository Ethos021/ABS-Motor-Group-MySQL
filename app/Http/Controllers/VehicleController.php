<?php

namespace App\Http\Controllers;

use App\Models\Vehicle;
use Illuminate\Http\Request;

class VehicleController extends Controller
{
    // GET /api/vehicles
    public function index()
    {
        $vehicles = Vehicle::orderBy('created_at', 'desc')->get();
        return response()->json($vehicles);
    }

    // GET /api/vehicles/{id}
    public function show($id)
    {
        $vehicle = Vehicle:: findOrFail($id);
        return response()->json($vehicle);
    }

    // POST /api/vehicles
    public function store(Request $request)
    {
        $validated = $request->validate([
            'make' => 'required|string',
            'model' => 'required|string',
            'year' => 'required|integer',
            'price' => 'required|numeric',
            'mileage' => 'required|integer',
            'body_type' => 'nullable|string',
            'fuel_type' => 'nullable|string',
            'stock_number' => 'nullable|string',
        ]);

        $vehicle = Vehicle::create($validated);
        return response()->json($vehicle, 201);
    }

    // PUT /api/vehicles/{id}
    public function update(Request $request, $id)
    {
        $vehicle = Vehicle::findOrFail($id);
        
        $validated = $request->validate([
            'make' => 'sometimes|string',
            'model' => 'sometimes|string',
            'year' => 'sometimes|integer',
            'price' => 'sometimes|numeric',
            'mileage' => 'sometimes|integer',
            'body_type' => 'nullable|string',
            'fuel_type' => 'nullable|string',
        ]);

        $vehicle->update($validated);
        return response()->json($vehicle);
    }

    // DELETE /api/vehicles/{id}
    public function destroy($id)
    {
        $vehicle = Vehicle::findOrFail($id);
        $vehicle->delete();
        return response()->json(null, 204);
    }
}
