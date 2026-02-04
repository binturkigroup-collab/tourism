import ListProps from "./ListProps";
import {Menu} from "@/models/menu/Menu";

interface MenuProps extends ListProps, ReorderProps, DeleteProps{
    menus: Menu [];
}

export default MenuProps;

export interface MenuGridProps {
    id: number;
    name: string;
    parent: string;
    isActive: boolean;
}
