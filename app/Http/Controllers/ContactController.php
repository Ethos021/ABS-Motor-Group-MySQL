<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactController extends Controller
{
    public function index()
    {
        return Inertia::render('Contact');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'phone' => ['required', 'string', 'max:50'],
            'email' => ['required', 'email'],
            'message' => ['required', 'string'],
            'subject' => ['nullable', 'string'],
            'preferredContact' => ['nullable', 'string'],
        ]);
        $nameParts = explode(' ', trim($validated['name']), 2);
        Enquiries::create([
            'enquiry_type' => match ($validated['subject'] ?? null) {
                'Vehicle Interest' => 'vehicle_interest',
                'Test Drive' => 'test_drive',
                'Finance' => 'finance',
                'Trade-In' => 'trade_in',
                default => 'general',
            },

            'firstName' => $nameParts[0],
            'lastName' => $nameParts[1] ?? '',

            'mobile' => $validated['phone'],
            'email' => $validated['email'],
            'message' => $validated['message'],

            'preferredContactMethod' => strtolower($validated['preferredContact'] ?? 'email'),

            // Tracking / meta
            'pageUrl' => $request->fullUrl(),
            'referrer' => $request->headers->get('referer'),
            'ipAddress' => $request->ip(),
        ]);

        // IMPORTANT: return back, not redirect to a new page
        return back()->with('success', true);
    }
}
