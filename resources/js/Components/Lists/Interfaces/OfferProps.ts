import ListProps from "./ListProps";
import Offer from "@/models/offer/Offer";

interface OfferProps extends ListProps{
    offers: Offer [];
    deleteOffer: (id: number) => void;
}

export default OfferProps;

export interface OfferGridProps {
    id: number;
    name: string;
    category: string;
    isActive: boolean;
    amount: number;
    isPercent: boolean;
    valid: boolean;
}
