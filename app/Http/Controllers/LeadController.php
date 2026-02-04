<?php

namespace App\Http\Controllers;

use App\Enums\BlockCategoryEnum;
use App\Facades\RealEstateService\LeadService;
use App\Facades\WebsiteService\BlockService;
use App\Models\Lead;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

class LeadController extends Controller
{
    public function index()
    {
        return response()->json(LeadService::getLeads());
    }

    public function list(): \Inertia\Response
    {
        return Inertia::render('Admin/Tourism/Leads/ListAll', [
            'leads' => LeadService::getLeads(),
        ]);
    }
    public function store(Request $request): JsonResponse
    {
        try {
            $data = $request->all();
            $lead = LeadService::storeLead($data);
            return response()->json([
                'status' => 'success',
                'message' => 'Block Store Added Successfully',
                'block' => LeadService::mapLeadModel($lead),
            ]);
        }
        catch (\Exception $exception) {
            return response()->json([
                'status' => 'error',
                'message' => $exception->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function edit(Lead $lead): \Inertia\Response
    {
        $agents = BlockService::getBlocksByCategory(Str::slug(BlockCategoryEnum::AGENT->value));
        return Inertia::render('Admin/RealEstate/Leads/LeadDetails',
            [
                'lead' => LeadService::mapLeadModel($lead),
                'agents' => $agents,
            ]);
    }

    public function update(Request $request, Lead $lead): JsonResponse
    {
        try {
            $data = $request->all();
            $lead = LeadService::updateLead($lead, $data);
            return response()->json(LeadService::mapLeadModel($lead));
        }
        catch (\Exception $exception) {
            return response()->json([
                'status' => 'error',
                'message' => $exception->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function removeAgent(Request $request, Lead $lead): JsonResponse
    {
        try {
//            $data = $request->all();
            $lead = LeadService::removeAgentLead($lead);
            return response()->json(LeadService::mapLeadModel($lead));
        }
        catch (\Exception $exception) {
            return response()->json([
                'status' => 'error',
                'message' => $exception->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function destroy(Lead $lead): JsonResponse
    {
        try {
            LeadService::deleteLead($lead);
            return response()->json([
                'status' => 'success',
                'message' => 'Lead Deleted Successfully',
            ]);
        } catch (\Exception $exception) {
            return response()->json([
                'status' => 'error',
                'message' => $exception->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function agent(Request $request, Lead $lead): JsonResponse
    {
        try {
            $data = $request->all();
            $leadModel = LeadService::agent($data, $lead);
            return response()->json($leadModel);
        } catch (\Exception $exception) {
            return response()->json([
                'status' => 'error',
                'message' => $exception->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
