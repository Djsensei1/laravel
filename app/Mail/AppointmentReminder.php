<?php

namespace App\Mail;

use App\Models\Appointment;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class AppointmentReminder extends Mailable
{
    use Queueable, SerializesModels;

    public $appointment;

    public function __construct(Appointment $appointment)
    {
        $this->appointment = $appointment;
    }

    public function build()
    {
        $html = <<<HTML
<!DOCTYPE html>
<html>
<head>
    <title>Appointment Reminder</title>
</head>
<body>
    <h1>Appointment Reminder</h1>
    <p>Hello,</p>
    <p>This is a reminder for your appointment between {$this->appointment->user->name} and {$this->appointment->withUser->name} today at {$this->appointment->appointment_time}.</p>
    <p>Regards,<br>Appointment Book Team</p>
</body>
</html>
HTML;

        return $this->subject('Appointment Reminder')
                    ->html($html);
    }
}