<?php

namespace App\Services\WebsiteService;

use App\Facades\WebsiteService\BlockService;
use App\Models\Contact;
use Carbon\Carbon;
use Carbon\Exceptions\Exception;

class ContactService
{
    public function mapContact(Contact $contact): array
    {
        $agent = $contact->agent()->first();
        $agentName = $agent ? BlockService::getBlockName($agent) : null;
        return [
            'id' => $contact->id,
            'agentId' =>$contact->agent_id,
            'agentName' => $agentName,
            'name' => $contact->name,
            'phone' => $contact->phone,
            'email' => $contact->email,
            'message' => $contact->message,
            'type' => $contact->type,
            'action' => $contact->action,
            'createdAt' => Carbon::make($contact->created_at)->format('M d, Y'),
        ];
    }

    public function getCount(): int
    {
        return Contact::all()->count();
    }

    public function getContacts(): array
    {
        $contacts = Contact::
            query()->
            orderBy('created_at', 'desc')->
            get();
        $contactsModel = [];
        foreach ($contacts as $contact) {
            $contactsModel[] = $this->mapContact($contact);
        }

        return $contactsModel;
    }

    public function getContact(Contact $contact): array
    {
        return $this->mapContact($contact);
    }

    public function storeContact(array $data): void
    {
        $contact = new Contact();
        $contact->fill($data);
        $contact->save();
    }

    public function deleteContact(Contact $contact): void
    {
        $contact->delete();
    }

    public function agent(array $data, Contact $contact): array
    {
        $contact->agent_id = $data['agentId'] ?? null;
        $contact->update();
        return $this->mapContact($contact);
    }
}
