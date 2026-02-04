import {BlockTranslation} from "./BlockTranslation" ;
import File from "@/models/files/File";

export class Block {
    id: number;
    categoryId: number;
    category: string;
    parentId: number;
    // name: string;
    // description: string;
    images: File [];
    url: string;
    file: string;
    order: number;
    isActive: boolean;
    startDate: string | null;
    endDate: string | null;
    createdAt: string;
    translations: BlockTranslation [];
    files: File [];

    constructor({
                    id = -1,
                    categoryId = -1,
                    parentId = -1,
                    category = '',
                    // name = '',
                    // description = '',
                    images = ([] as File []),
                    url = '',
                    file = '',
                    order = -1,
                    isActive = false,
                    startDate = '',
                    endDate = '',
                    createdAt = '',
                    translations = [],
                    files = [],
                }) {
        this.id = id;
        this.categoryId = categoryId;
        this.parentId = parentId;
        this.category = category;
        // this.name = name;
        // this.description = description;
        this.images = images;
        this.file = file;
        this.url = url;
        this.order = order;
        this.isActive = isActive;
        this.startDate = startDate;
        this.endDate = endDate;
        this.createdAt = createdAt;
        this.translations = [...translations];
        this.files = [...files];
    }

    public static columns = [
        'id',
        'name', //name + image.
        'category',
        'order',
        'isActive',
        'details',
    ];
}
