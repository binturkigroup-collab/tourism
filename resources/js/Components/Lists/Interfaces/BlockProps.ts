import ListProps from "./ListProps";
import {Block} from "@/models/block/Block";

interface BlockProps extends ListProps, ReorderProps, DeleteProps{
    blocks: Block [];
    // deleteBlock: (id: number) => void;
    // reorder: (data: {id: number, order: number} []) => void,
}

export default BlockProps;

export interface BlockGridProps {
    id: number;
    avatar: string;
    name: string;
    parent: string;
    isActive: boolean;
    createdAt: string;
    category?: string;
}
