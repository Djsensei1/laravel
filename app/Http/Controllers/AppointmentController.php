<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AppointmentController extends Controller
{
    public function index()
    {
        $users = User::where('id', '!=', auth()->id())->get(['id', 'name']); // Exclude current user
        return Inertia::render('Appointments', [
            'users' => $users,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'with_user_id' => 'required|exists:users,id',
            'appointment_time' => 'required|date|after:now',
            'description' => 'nullable|string|max:255',
        ]);

        Appointment::create([
            'user_id' => auth()->id(),
            'with_user_id' => $request->with_user_id,
            'appointment_time' => $request->appointment_time,
            'description' => $request->description,
        ]);

        return redirect()->route('appointments')->with('message', 'Appointment requested successfully!');
    }
}