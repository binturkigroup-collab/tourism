import BlockProps from "@/Interfaces/Site/BlockProps";
import Appointment from "@/models/block/Appointment";
import {Block} from "@/models/block/Block";

interface TripProps extends BlockProps {
    appointments: Appointment [],
    tags: BlockProps [];
    city: string;

    tripId: number;
    cityId: number;
    price: string;
    maxGuests: string;
    minAge: string;
    tripPackage: string;
    duration: string;
    unit: string;
    // tags: Tag
}

export default TripProps;
