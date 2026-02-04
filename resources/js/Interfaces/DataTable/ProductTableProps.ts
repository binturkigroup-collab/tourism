import {DataTable} from "@/Interfaces/DataTable/TableProps";

interface ProductTableProps extends DataTable {
    id: number;
    name: string;
    category: string;
    isActive: boolean;
    sellPrice: number;
    originalPrice: number;
    count: number;
    sku: string;
    edit: string;
    delete: string;
    createdAt: string;
    image: string,
}

export default ProductTableProps;

