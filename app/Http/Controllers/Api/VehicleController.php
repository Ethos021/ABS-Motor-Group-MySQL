<?php
// app/Http/Controllers/VehicleController.php
namespace App\Http\Controllers;

use App\Models\Vehicle;
use Inertia\Inertia;
use Illuminate\Http\Request;

class VehicleController extends Controller
{
    public function hero()
    {
        return Inertia::render('Home', [
            'vehicles' => Vehicle::select('id', 'make', 'year', 'price', 'kilometers')->get(),
        ]);
    }
    

    public function browse(Request $request)
    {
        $query = Vehicle::query();

        if ($request->filled('make')) {
            $query->where('make', $request->make);
        }

        if ($request->filled(['priceMin', 'priceMax'])) {
            $query->whereBetween('price', [$request->priceMin, $request->priceMax]);
        }

        if ($request->filled(['yearMin', 'yearMax'])) {
            $query->whereBetween('year', [$request->yearMin, $request->yearMax]);
        }

        if ($request->filled(['kmMin', 'kmMax'])) {
            $query->whereBetween('kilometers', [$request->kmMin, $request->kmMax]);
        }

        return Inertia::render('Browse', [
            'vehicles' => $query->paginate(12)->withQueryString(),
            'filters' => $request->all(),
        ]);
    }
}
