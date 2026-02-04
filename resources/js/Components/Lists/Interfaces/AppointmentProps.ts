import ListProps from "@/Components/Lists/Interfaces/ListProps";
import Appointment from "@/models/block/Appointment";

interface AppointmentProps extends ListProps{
    appointments: Appointment [];
    deleteFn: (id: number) => void;
}

export default AppointmentProps;

export interface AppointmentGridProps {
    id: number;
    trip: string;
    date: string;
}
