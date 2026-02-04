<?php

namespace App\Emails;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class ReceiveCustomerEmail extends Mailable
{
    use Queueable, SerializesModels;

//    Email and name of the sender
    private string $name;
    private string $email;
    private string $message;

    private string $phone;


    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(
        string $name,
        string $subject,
        string $from,
        string $message,
        string $phone,
    )
    {
        $this->name = $name;
        $this->subject = $subject;
        $this->email = $from;
        $this->message = $message;
        $this->phone = $phone;
    }

    /**
     * Get the message envelope.
     */

    public function envelope (): Envelope {
        return new Envelope(
            from: new Address(config('mail.from.address'), config('mail.from.name')),
            subject: $this->subject,
        );
    }
//
    /**
     * Get the message content definition.
     */
    public function content () : Content {

        return new Content(
            markdown: 'emails.ReceiveCustomerEmail',
        );
    }
//
    /**
     * Get the attachments for the message.
     *
     * @return array<int, Attachment>
     */
    public function attachments(): array
    {
        return [];
    }

    /**
     * Build the message.
     *
    //     * @return $this
     */
    public function build()
    {
        return $this->markdown('emails.ReceiveCustomerEmail',
            [
                'name' => $this->name,
                'from' => $this->email,
                'message' => $this->message,
                'phone' => $this->phone,
            ]
        );
    }
}
