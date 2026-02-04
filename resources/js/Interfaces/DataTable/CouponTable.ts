import {DataTable} from "@/Interfaces/DataTable/TableProps";

interface CouponTable extends DataTable {
    id: number;
    code: string;
    amount: number;
    isPercent: boolean;
    isActive: boolean;
    edit: string;
    delete: string;
}

export default CouponTable;
