<?php

namespace App\Http\Controllers;

use App\Enums\BlockCategoryEnum;
use App\Facades\TourismService\AppointmentService;
use App\Models\Appointment;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

class AppointmentController extends Controller
{
    public function index(): \Inertia\Response
    {
        $count = AppointmentService::getAppointmentsCount();
        return Inertia::render('Admin/Tourism/Appointments/AppointmentList', [
            'appointments' => AppointmentService::getAppointments(),
            'count' => $count
        ]);
    }

    public function create(): \Inertia\Response
    {
        return Inertia::render('Admin/Tourism/Appointments/AppointmentAdd', [
            'category' => Str::slug( BlockCategoryEnum::APPOINTMENT->value ),
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->all();

        try {
            return response()->json([
                'status' => 'success',
                'message' => 'Appointment added successfully',
                'appointment' => AppointmentService::mapAppointmentModel(AppointmentService::store($data)),
            ]);



        } catch (\Exception $exception) {
            return response()->json([
                'status' => 'error',
                'message' => $exception->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function edit(Appointment $appointment): \Inertia\Response
    {
        return Inertia::render('Admin/Tourism/Appointments/AppointmentUpdate', [
            'appointment' => AppointmentService::mapAppointmentModel($appointment),
        ]);
    }

    public function update(Request $request, Appointment $appointment): JsonResponse
    {
        $data = $request->all();

        try {
            return response()->json([
                'status' => 'success',
                'message' => 'Appointment has been updated',
                'appointment' => AppointmentService::mapAppointmentModel(AppointmentService::update($appointment, $data)),
        ]);



        } catch (\Exception $exception) {
            return response()->json([
                'status' => 'error',
                'message' => $exception->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function destroy(Appointment $appointment): JsonResponse
    {
        try {
            AppointmentService::delete($appointment);
            return response()->json([
                'status' => 'success',
                'message' => 'Appointment has been deleted',
            ]);
        } catch (\Exception $exception) {
            return response()->json([
                'status' => 'error',
                'message' => $exception->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

}
