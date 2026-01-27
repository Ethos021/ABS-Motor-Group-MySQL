<?php

namespace App\Http\Controllers;

use App\Models\Enquiry;
use Inertia\Inertia;
use Illuminate\Http\Request;

class EnquiryController extends Controller
{
    public function store(Request $request)
{
    $validated = $request->validate([
        'enquiry_type' => 'required|string',
        'firstName' => 'required|string|max:255',
        'lastName' => 'required|string|max:255',
        'mobile' => 'nullable|string|max:50',
        'email' => 'nullable|email',
        'message' => 'nullable|string',
        'hasTradein' => 'boolean',
        'tradeInYear' => 'nullable|integer',
        'tradeInMake' => 'nullable|string',
        'tradeInModel' => 'nullable|string',
        'tradeInOdometer' => 'nullable|integer',
        'wantsFinance' => 'boolean',
        'wantsTestDrive' => 'boolean',
        'vehicle_id' => 'nullable|exists:vehicles,id',
        'vehicleSnapshot' => 'nullable|array',
        'vehiclePrice' => 'nullable|numeric',
        'financeEstimate' => 'nullable|array',
        'preferredContactMethod' => 'nullable|in:phone,email,whatsapp',
        'preferredContactTime' => 'nullable|string',
    ]);

    if ($request->vehicle_id) {
    $vehicle = \App\Models\Vehicle::find($request->vehicle_id);

    $validated['vehicleSnapshot'] = $vehicle
        ? $vehicle->only(['id', 'year', 'make', 'model'])
        : null;

    $validated['vehiclePrice'] = $vehicle?->price;
}

    $enquiry = Enquiry::create([
        ...$validated,
        'ipAddress' => $request->ip(),
        'pageUrl' => $request->headers->get('referer'),
        'referrer' => $request->headers->get('referer'),
    ]);

    return back()->with([
            'success' => true,
            'enquiryId' => $enquiry->id,
        ]);

}
}
