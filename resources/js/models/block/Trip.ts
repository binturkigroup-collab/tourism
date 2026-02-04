import { Block } from "./Block";
import File from "@/models/files/File";
import Appointment from "@/models/block/Appointment";

class Trip extends Block{

    tripId: number;
    cityId: number;
    price: string;
    maxGuests: string;
    minAge: string;
    tripPackage: string;
    duration: string;
    unit: string;
    includedFeatures: string[];
    excludedFeatures: string[];

    appointments: Appointment[];

    tags: Block [];

    constructor({
        id = -1,
        categoryId = -1,
        parentId = -1,
        category = '',
        images = ([] as File []),
        url = '',
        file = '',
        order = -1,
        isActive = false,
        startDate = '',
        endDate = '',
        createdAt = '',
        translations = [],
        files = [],
        tripId = -1,
        cityId = -1,
        price = '0',
        maxGuests = '0',
        minAge = '0',
        tripPackage = '',
        duration = '0',
        unit = '',
        tags = [],
        appointments = [] as Appointment[],
        includedFeatures = [] as string[],
        excludedFeatures = [] as string[],
                }) {
        super({
            id,
            categoryId,
            parentId,
            category,
            images,
            url,
            file,
            order,
            isActive,
            startDate,
            endDate,
            createdAt,
            translations,
            files,
        });

        this.tripId = tripId;
        this.cityId = cityId;
        this.price = price;
        this.maxGuests = maxGuests;
        this.minAge = minAge;
        this.duration = duration;
        this.unit = unit;
        this.tripPackage = tripPackage;
        this.tags = tags;
        this.appointments = [...appointments];
        this.includedFeatures = [...includedFeatures];
        this.excludedFeatures = [...excludedFeatures];
    }
}

export default Trip;
