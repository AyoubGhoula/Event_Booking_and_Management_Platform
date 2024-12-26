<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class EmailVerificationCode extends Notification implements ShouldQueue
{
    use Queueable;

    private $code;

    public function __construct($code)
    {
        $this->code = $code;
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('Verify Your Email - EventMaster')
            ->greeting('Hello ' . $notifiable->name . '!')
            ->line('Welcome to EventMaster! Please use the verification code below to verify your email address.')
            ->line('Your verification code is: ' . $this->code)
            ->line('This code will expire in 15 minutes.')
            ->line('If you did not create an account, no further action is required.');
    }

    public function toArray($notifiable)
    {
        return [
            'code' => $this->code
        ];
    }
}
