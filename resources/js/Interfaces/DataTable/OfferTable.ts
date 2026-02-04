import {DataTable} from "@/Interfaces/DataTable/TableProps";

interface OfferTable extends DataTable {
    id: number;
    name: string;
    category: string;
    amount: number;
    isPercent: boolean;
    isActive: boolean;
    edit: string;
    delete: string;
}

export default OfferTable;
