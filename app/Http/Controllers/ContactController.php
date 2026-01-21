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
            'name' => 'required|string',
            'email' => 'required|email',
            'phone' => 'required|string',
            'subject' => 'nullable|string',
            'message' => 'required|string',
            'preferredContact' => 'nullable|string',
        ]);

        // TODO:
        // Save to DB OR send email OR both

        return back()->with('success', true);
    }
}
