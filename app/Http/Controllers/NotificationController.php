<?php

namespace App\Http\Controllers;

use App\Facades\WebsiteService\ContactService;
use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Mail;
use App\Emails\ReceiveCustomerEmail;
use App\Emails\SendCustomerEmail;
use PHPUnit\Exception;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Mailer\Messenger\SendEmailMessage;

class NotificationController extends Controller
{
    /**
     * Display a listing of the resource.
     * @return Renderable
     */
    public function index()
    {
        return view('notification::index');
    }

    /**
     * Show the form for creating a new resource.
     * @return Renderable
     */
    public function create()
    {
        return view('notification::create');
    }

    /**
     * Store a newly created resource in storage.
     * @param Request $request
     * @return Renderable
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Show the specified resource.
     * @param int $id
     * @return Renderable
     */
    public function show($id)
    {
        return view('notification::show');
    }

    /**
     * Show the form for editing the specified resource.
     * @param int $id
     * @return Renderable
     */
    public function edit($id)
    {
        return view('notification::edit');
    }

    /**
     * Update the specified resource in storage.
     * @param Request $request
     * @param int $id
     * @return Renderable
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     * @param int $id
     * @return Renderable
     */
    public function destroy($id)
    {
        //
    }

    public function sendUserEmail(Request $request): JsonResponse
    {
        try {
//            dd($request->all(), config('mail.contact-receiver.address'));
            //TODO: store the contact here.
            $data = $request->all();
//            dd($data);
            ContactService::storeContact($request->all());
            //Send Email to our mail host:
            Mail::to(config('mail.contact-receiver.address'))->send(new ReceiveCustomerEmail(
                $request->name,
                $request->subject ?? 'Normal Message',
                $request->email,
                $request->message,
                $request->phone,
            ));

//        Respond with another email from our mail host to the sender!
            Mail::to($request->email)->send(new SendCustomerEmail(
                config('app.name'),
                'Greeting Message',
                config('mail.from.address'),
                $request->name,
            ));

            return response()->json([
                'status' => 'success',
                'message' => 'Your Message has been sent',
            ]);
        } catch (\Exception $exception) {
            return response()->json([
                'status' => 'Failed',
                'Message' => 'Error while sending your message',
                'details' => $exception->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

    }
}
