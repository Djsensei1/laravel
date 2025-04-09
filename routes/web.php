<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AppointmentController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\Appointment;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    $approvedAppointments = Appointment::with(['user', 'withUser'])
        ->where('status', 'approved')
        ->where(function ($query) {
            $query->where('user_id', auth()->id())
                  ->orWhere('with_user_id', auth()->id());
        })
        ->get();

    return Inertia::render('Dashboard', [
        'approvedAppointments' => $approvedAppointments,
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/appointments', [AppointmentController::class, 'index'])->name('appointments');
    Route::post('/appointments', [AppointmentController::class, 'store'])->name('appointments.store');

    Route::get('/appointment-requests', [AppointmentController::class, 'requests'])->name('appointment.requests');
    Route::patch('/appointment-requests/{appointment}', [AppointmentController::class, 'updateStatus'])->name('appointment.updateStatus');
});

require __DIR__.'/auth.php';