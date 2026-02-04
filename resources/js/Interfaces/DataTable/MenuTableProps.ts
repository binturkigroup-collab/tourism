import {DataTable} from "@/Interfaces/DataTable/TableProps";

interface MenuTable extends DataTable {
    id: number;
    name: string;
    parent: string;
    isActive: boolean;
    edit: string;
    delete: string;
    createdAt: string;
    // image: string;
}

export default MenuTable;
