<?php

namespace App\Services\TourismService;

use App\Enums\BlockCategoryEnum;
use App\Facades\FileService\UploadService;
use App\Models\Appointment;
use App\Models\Block;
use App\Models\Trip;
use App\Services\WebsiteService\BlockService;
use App\Facades\TourismService\AppointmentService;
use Illuminate\Support\Str;

class TripService extends BlockService
{
    public function mapTripModel(Trip $trip): array
    {
        return [
            'tripId' => $trip->id,
            'cityId' => $trip->city_id,
            'price' => $trip->price,
            'maxGuests' =>(string) $trip->max_guests,
            'minAge' => (string) $trip->min_age,
            'tripPackage' => $trip->package,
            'duration' => (string) $trip->duration,
            'unit' => $trip->unit,
            'includedFeatures' => !is_null($trip->included_features) ? explode($trip->included_features, ',') : [''],
            'excludedFeatures' => !is_null($trip->excluded_features) ? explode($trip->excluded_features, ',') : [''],
        ];
    }

    public function fillTripForm(Trip &$trip, int $blockId): void {
        $data = request()->all();
        $trip->fill([
            'block_id' => $blockId,
            'city_id' => $data ['cityId'],
            'price' => $data ['price'],
            'max_guests' => $data ['maxGuests'],
            'min_age' => $data ['minAge'],
            'package' => $data ['package'] ?? null,
            'duration' => $data ['duration'],
            'unit' => $data ['unit'],
            'included_features' => isset($data ['includedFeatures']) ?? null,
            'excluded_features' => isset($data ['excludedFeatures']) ?? null,
        ]);
    }


    public function mapBlockModel(Block $block): array
    {
        $blockModel = parent::mapBlockModel($block);
        $trip = $block->trip()->first();
        $tags = $block->tags()->get();
        $appointments = $block->appointments()->get();

        $appointmentsModel = [];
        $tagsModel = [];

        foreach ($appointments as $appointment) {
//            $appointmentsModel[] = $this->mapDateModel($appointment);
            $appointmentsModel[] = AppointmentService::mapAppointmentModel($appointment);
        }

        foreach ($tags as $tag) {
            $tagsModel[] = parent::mapBlockModel($tag);
        }



        return [
            ...$blockModel,
            'appointments' => $appointmentsModel,
            'tags' => $tagsModel,
            ...$this->mapTripModel($trip),
        ];
    }

    public function mapLocaleBlockModel(Block $block): array
    {
        $blockModel = parent::mapLocaleBlock($block);
        $trip = $block->trip()->first();
        $tags = $block->tags()->get();
        $appointments = $block->activeAppointments()->get();
        $city = $trip->city()->first();

        $cityName = $this->getBlockName($city);

        $appointmentsModel = [];
        $tagsModel = [];

        foreach ($appointments as $appointment) {
            $appointmentsModel[] = AppointmentService::mapAppointmentModel($appointment);
        }

        foreach ($tags as $tag) {
            $tagsModel[] = parent::mapLocaleBlock($tag);
        }



        return [
            ...$blockModel,
            'appointments' => $appointmentsModel,
            'tags' => $tagsModel,
            'city' => $cityName,
            ...$this->mapTripModel($trip),
        ];
    }

    public function packages(): array
    {
        $packagesModel = [];
        $packages = Block::query()
            ->where('category', Str::slug(BlockCategoryEnum::TRIP->value, '-'))
            ->where('is_active', true)
            ->whereHas('trip', function ($query) {
                $query->where('package', '<>', null);
            })->get();

        foreach ($packages as $package) {
            $packagesModel[] = $this->mapLocaleBlockModel($package);
        }

        return $packagesModel;
    }

    public function normalTrips(): array
    {
        $normalTripsModel = [];
        $normalTrips = Block::query()
            ->where('category', Str::slug(BlockCategoryEnum::TRIP->value, '-'))
            ->where('is_active', true)
            ->whereHas('trip', function ($query) {
            $query->where('package', null);
        })->get();

        foreach ($normalTrips as $normalTrip) {
            $normalTripsModel[] = $this->mapLocaleBlockModel($normalTrip);
        }

        return $normalTripsModel;
    }

    public function storeBlock(array $data): array
    {
//        dd($data);
       //Store Block:
        $block = new Block();
        $this->fillBlockForm($block);
        $block->save();
        //Store Translations:
        $this->storeTranslations($data, $block);
        //Store Files:
        //        2. Store File:
        if (array_key_exists('image', $data)) {
            $data['refId'] = $block->id;
            $data['refType'] = $this->reference;
            UploadService::saveFile($data, 'image', 'block');
        }

        //Store Trip:
        $trip = new Trip();
        $this->fillTripForm($trip, $block->id);
        $trip->save();

        //Store Tags:
        $block->tags()->sync($data['tags']);

        return $this->mapBlockModel($block);
    }

    public function updateTranslations(array $data, Block $block)
    {
        parent::updateTranslations($data, $block);

        //Handle tags:
        $block->tags()->sync($data['tags']);

        $trip = $block->trip()->first();

        $this->fillTripForm($trip, $block->id);
        $trip->update();

        return Block::query()->where('id', $block->id)->first();
    }
}
