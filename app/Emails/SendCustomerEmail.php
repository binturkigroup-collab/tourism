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
use Illuminate\View\View;
use function Symfony\Component\Translation\t;

class SendCustomerEmail extends Mailable
{
    use Queueable, SerializesModels;

    private string $name;
    private string $receipt;
    private string $email;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($name, string $subject, string $from, string $receipt)
    {
        $this->name = $name;
        $this->subject = $subject;
        $this->email = $from;
        $this->receipt = $receipt;
    }

    /**
     * Get the message envelope.
     */

    public function envelope (): Envelope {
        return new Envelope(
            from: new Address($this->email, $this->name),
            subject: $this->subject,
        );
    }
//
    /**
     * Get the message content definition.
     */
    public function content () : Content {

        return new Content(
          markdown: 'emails.SendCustomerEmail',
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
        return $this->markdown('emails.SendCustomerEmail',
            [
                'receipt' => $this->receipt,
            ]
        );
    }
}
