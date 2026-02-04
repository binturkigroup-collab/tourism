import ListProps from "./ListProps";
import Category from "@/models/category/Category";

interface CategoryProps extends ListProps {
    categories: Category [];
    deleteCategory: (id: number) => void;
    reorder: (data: {id: number, order: number} []) => void,
}

export default CategoryProps;

export interface CategoryGridProps {
    id: number;
    name: string;
    avatar: string;
    parent: string;
    isActive: boolean;
    createdAt: string;
}
