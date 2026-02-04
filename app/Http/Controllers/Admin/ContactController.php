<?php

namespace App\Http\Controllers\Admin;

use App\Enums\BlockCategoryEnum;
use App\Facades\WebsiteService\BlockService;
use App\Facades\WebsiteService\ContactService;
use App\Http\Controllers\Controller;
use App\Models\Contact;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class ContactController extends Controller
{
    public function index(): Response
    {
        $contacts = ContactService::getContacts();
        $count = ContactService::getCount();
        return Inertia::render('Admin/Website/Contact/ContactList', [
            'contacts' => $contacts,
            'count' => $count,
        ]);
    }

    public function show(Contact $contact): Response
    {
        $agents = BlockService::getBlocksByCategory(Str::slug(BlockCategoryEnum::AGENT->value));
        return Inertia::render('Admin/Website/Contact/ContactShow', [
            'contact' => ContactService::mapContact($contact),
            'agents' => $agents,
        ]);
    }

    public function destroy(Contact $contact): JsonResponse {
        try {
            ContactService::deleteContact($contact);
            return response()->json([
                'status' => 'success',
                'message' => 'Contact deleted successfully',
            ]);
        } catch (\Exception $exception) {
            return response()->json([
                'status' => 'error',
                'message' => $exception->getMessage(),
            ]);
        }
    }

    public function agent(Request $request, Contact $contact): JsonResponse
    {
        try {
            $data = $request->all();
            $contactModel = ContactService::agent($data, $contact);
            return response()->json($contactModel);
        } catch (\Exception $exception) {
            return response()->json([
                'status' => 'error',
                'message' => $exception->getMessage(),
            ], \Symfony\Component\HttpFoundation\Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
