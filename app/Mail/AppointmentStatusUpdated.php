<?php

namespace App\Mail;

use App\Models\Appointment;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class AppointmentStatusUpdated extends Mailable
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
    <title>Appointment Status Updated</title>
</head>
<body>
    <h1>Appointment Status Updated</h1>
    <p>Hello,</p>
    <p>The appointment between {$this->appointment->user->name} and {$this->appointment->withUser->name} at {$this->appointment->appointment_time} has been {$this->appointment->status}.</p>
    <p>Regards,<br>Appointment Book Team</p>
</body>
</html>
HTML;

        return $this->subject('Appointment Status Updated')
                    ->html($html);
    }
}