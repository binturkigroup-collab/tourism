<?php

namespace App\Services\TourismService;

use App\Facades\WebsiteService\BlockService;
use App\Models\Appointment;
use Carbon\Carbon;

class AppointmentService
{

    public function mapAppointmentModel(Appointment $model): array
    {
        return [
            'id' => $model->id,
            'blockId' => $model->block_id,
            'trip' => BlockService::getBlockNameById($model->block_id),
            'startDate' => $model->start_date,
            'maxGuests' => $appointment->max_guests ?? 0,
            'minAge' => $appointment->min_age ?? 0,
            'availableSpots' => $appointment->available_spots ?? 0,
            'isActive' => (bool)$model->is_active,
        ];
    }

    public function getAppointments(): array
    {
        $appointments = Appointment::all();
        $appointmentModels = [];
        foreach ($appointments as $appointment) {
            $appointmentModels[] = $this->mapAppointmentModel($appointment);
        }
        return $appointmentModels;
    }

    public function getAppointmentsCount(): int
    {
        return Appointment::all()->count();
    }
    public function store(array $data): Appointment
    {
//        dd($data);
        $appointment = new Appointment();
        $appointment->fill([
            'block_id' => $data['blockId'],
            'start_date' => Carbon::make($data['startDate']),
            'is_active' => array_key_exists('isActive', $data) ? $data['isActive'] === 'true' : 1,
        ]);

        $appointment->save();
        return $appointment;
    }

    public function update(Appointment $appointment, array $data)
    {
        $appointment->fill([
            'block_id' => $data['blockId'],
            'start_date' => Carbon::make($data['startDate']),
            'is_active' => array_key_exists('isActive', $data) ? $data['isActive'] === 'true' : 1,
        ]);
        $appointment->update();
        return $appointment;
    }

    public function delete(Appointment $appointment): void {
        $appointment->delete();
    }
}
