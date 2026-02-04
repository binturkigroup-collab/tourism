<?php

namespace App\Services\TourismService;

use App\Facades\WebsiteService\BlockService;
use App\Models\Block;
use App\Models\Lead;
use App\Models\Project;
use App\Models\Property;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

class LeadService
{
    private function getTypeByReference(string $type): string
    {
        return match ($type) {
            Property::class => "property",
            Block::class => "developer",
            default => "project",
        };
    }

    private function getReferenceByType(string $type): string
    {
        return match ($type) {
            "property" => Property::class,
            "developer" => Block::class,
            default => Project::class,
        };
    }

    private function getRefName(Lead $lead): string
    {
        switch ($lead->reference_type) {
            case Block::class:
                return BlockService::getBlockNameById($lead->reference_id);
                break;
            default:
               return BlockService::getBlockNameById($lead->reference()->first()->block_id);
               break;
        }
    }

    public function mapLeadModel(Lead $lead): array
    {
//        dd($lead->reference);
        $referenceType = $this->getTypeByReference($lead->reference_type);

//        $referenceName = BlockService::getBlockNameById($lead->reference()->first()->block_id);
        $referenceName = $this->getRefName($lead);
        $agent = $lead->agent()->first();
        $agentId = $agent ? $agent->id : null;
        $agentName = $agent ? BlockService::getBlockName($agent) : null;
        return [
            'id' => $lead->id,
            'referenceId' => $lead->reference_id,
            'referenceName' => $referenceName,
            'referenceType' => $referenceType,
            'agentId' => $agentId,
            'agentName' => $agentName,
            'name' => $lead->name,
            'email' => $lead->email,
            'phone' => $lead->phone,
            'message' => $lead->message,
            'action' => $lead->action,
        ];
    }

    public function getLead( Lead $lead ): array
    {
        return $this->mapLeadModel($lead);
    }

    public function getLeadById( int $id ): array | null
    {
        $lead = Lead::query()->findOrFail($id);
        if ($lead) {
            return $this->mapLeadModel($lead);
        } else return null;
    }

    public function getLeads(): array
    {
        $leads = Lead::query()->get();
        $leadsModel = [];
        foreach ($leads as $lead) {
            $leadsModel[] = $this->mapLeadModel($lead);
        }
        return $leadsModel;
    }

    public function getRawLead(int $id): Model|Collection|Lead|null
    {
        return Lead::query()->findOrFail($id);
    }

    public function storeLead(array $data): Lead
    {
        dd($data);
        $reference = $this->getReferenceByType($data['type']);
        $lead = new Lead();
        $lead->fill([
            'reference_id' => $data['referenceId'],
            'reference_type' => $reference,
            'agent_id' => $data['agentId'] ?? null,
            "name" => $data['name'],
            "email" => $data['email'] ?? null,
            "phone" => $data['phone'],
            "message" => $data['note'] ?? null,
            "action" => $data['action'] ?? null,
        ]);

        $lead->save();

//        TODO: Send the brochure for projects/ Or generate PDF for properties.
        return $lead;
    }

    public function updateLead(Lead $lead, array $data): Lead
    {
        $lead->agent_id = $data['agentId'] ?? null;
        $lead->update();
        return $lead;
    }

    public function removeAgentLead(Lead $lead): Lead
    {
        $lead->agent_id = null;
        $lead->update();
        return $lead;
    }

    public function deleteLead(Lead $lead): void {
        $lead->delete();
    }

    public function agent(array $data, Lead $lead): array
    {
        $lead->agent_id = $data['agentId'] ?? null;
        $lead->update();
        return $this->mapLeadModel($lead);
    }
}
