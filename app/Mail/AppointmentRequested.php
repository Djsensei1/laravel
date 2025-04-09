<?php

namespace App\Mail;

use App\Models\Appointment;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class AppointmentRequested extends Mailable
{
    use Queueable, SerializesModels;

    public $appointment;

    public function __construct(Appointment $appointment)
    {
        $this->appointment = $appointment;
    }

    public function build()
    {
        // Evaluate the description outside the heredoc to avoid ?? syntax issue
        $description = $this->appointment->description ?? 'N/A';

        $html = <<<HTML
<!DOCTYPE html>
<html>
<head>
    <title>New Appointment Request</title>
</head>
<body>
    <h1>New Appointment Request</h1>
    <p>Hello,</p>
    <p>{$this->appointment->user->name} has requested an appointment with {$this->appointment->withUser->name}.</p>
    <p><strong>Time:</strong> {$this->appointment->appointment_time}</p>
    <p><strong>Description:</strong> {$description}</p>
    <p>Please review the request in your Appointment Requests page.</p>
    <p>Regards,<br>Appointment Book Team</p>
</body>
</html>
HTML;

        return $this->subject('New Appointment Request')
                    ->html($html);
    }
}