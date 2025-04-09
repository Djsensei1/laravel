<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Mail\AppointmentRequested;
use App\Mail\AppointmentStatusUpdated;
use Illuminate\Support\Facades\Mail;

class AppointmentController extends Controller
{
    public function index()
    {
        $users = User::where('id', '!=', auth()->id())->get(['id', 'name']);
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

        $appointment = Appointment::create([
            'user_id' => auth()->id(),
            'with_user_id' => $request->with_user_id,
            'appointment_time' => $request->appointment_time,
            'description' => $request->description,
            'status' => 'pending',
        ]);

        Mail::to($appointment->user->email)->send(new AppointmentRequested($appointment));
        Mail::to($appointment->withUser->email)->send(new AppointmentRequested($appointment));

        return redirect()->route('appointments')->with('message', 'Appointment requested successfully!');
    }

    public function requests()
    {
        $requestedByMe = Appointment::with('withUser')
            ->where('user_id', auth()->id())
            ->get();

        $requestedWithMe = Appointment::with('user')
            ->where('with_user_id', auth()->id())
            ->where('status', 'pending')
            ->get();

        return Inertia::render('AppointmentRequests', [
            'requestedByMe' => $requestedByMe,
            'requestedWithMe' => $requestedWithMe,
        ]);
    }

    public function updateStatus(Request $request, Appointment $appointment)
    {
        if ($appointment->with_user_id !== auth()->id()) {
            return redirect()->route('appointment.requests')->with('error', 'Unauthorized action.');
        }

        $request->validate([
            'status' => 'required|in:approved,rejected',
        ]);

        if ($request->status === 'approved') {
            // Approve: Update status and redirect to dashboard
            $appointment->update(['status' => 'approved']);
            Mail::to($appointment->user->email)->send(new AppointmentStatusUpdated($appointment));
            Mail::to($appointment->withUser->email)->send(new AppointmentStatusUpdated($appointment));
            return redirect()->route('dashboard')->with('message', 'Appointment approved and added to your dashboard!');
        } else {
            // Reject: Notify users, then delete
            $appointment->update(['status' => 'rejected']); // Update status for email context
            Mail::to($appointment->user->email)->send(new AppointmentStatusUpdated($appointment));
            Mail::to($appointment->withUser->email)->send(new AppointmentStatusUpdated($appointment));
            $appointment->delete();
            return redirect()->route('appointment.requests')->with('message', 'Appointment rejected and removed.');
        }
    }
}