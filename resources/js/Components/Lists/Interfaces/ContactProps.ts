import ListProps from "@/Components/Lists/Interfaces/ListProps";
import Contact from "@/models/Contact/Contact";

interface ContactsProps extends ListProps{
    contacts: Contact [];
    deleteFn: (id: number) => void;
}

export default ContactsProps;

export interface ContactGridProps {
    id: number;
    name: string;
    phone: string;
    email: string;
    message: string;
    type: string;
    createdAt: string;
}
