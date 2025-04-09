<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Appointment;
use App\Mail\AppointmentReminder;
use Illuminate\Support\Facades\Mail;
use Carbon\Carbon;

class SendAppointmentReminders extends Command
{
    protected $signature = 'appointments:send-reminders';
    protected $description = 'Send reminders for appointments scheduled for today';

    public function handle()
    {
        $today = Carbon::today();
        $appointments = Appointment::whereDate('appointment_time', $today)
            ->where('status', 'approved')
            ->get();

        foreach ($appointments as $appointment) {
            Mail::to($appointment->user->email)->send(new AppointmentReminder($appointment));
            Mail::to($appointment->withUser->email)->send(new AppointmentReminder($appointment));
        }

        $this->info('Appointment reminders sent successfully!');
    }
}