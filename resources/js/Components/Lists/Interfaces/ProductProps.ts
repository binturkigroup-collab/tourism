import ListProps from "./ListProps";
import Product from "@/models/product/Product";

interface ProductProps extends ListProps{
    products: Product [];
    deleteProduct: (id: number) => void,
}

export default ProductProps;

export interface ProductGridProps {
    id: number;
    name: string;
    avatar: string;
    category: string;
    isActive: boolean;
    sellPrice: number;
    originalPrice: number;
    count: number;
    sku: string;
    createdAt: string;
}
