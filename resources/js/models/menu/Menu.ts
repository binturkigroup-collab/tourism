import {MenuTranslation} from "./MenuTranslation";
import LinkCategoriesEnum from "@/Enums/LinkCategoriesEnum";
import File from "@/models/files/File";
import ContactMenuEnum from "@/Enums/ContactMenuEnum";
import MainMenuTypesEnum from "@/Enums/MainMenuTypesEnum";
import SocialMenuEnum from "@/Enums/SocialMenuEnum";

export class Menu {
    id: number;
    parentId: number;
    category: string;
    name: string;
    order: number;
    url: string;
    target: string;
    type: MainMenuTypesEnum | ContactMenuEnum | SocialMenuEnum;
    blockType: string;
    file: File | null;
    translations: MenuTranslation[];
    isActive: boolean;
    createdAt: string;
    image: string;

    constructor({
                    id = -1,
                    parentId = -1,
                    category = '',
                    name = '',
                    order = -1,
                    url = '',
                    target = '',
                    type = MainMenuTypesEnum.BLOCK,
                    blockType = '',
                    file = null,
                    translations = [],
                    isActive = false,
                    createdAt = '',
                    image = '',
                }) {
        this.id = id;
        this.parentId = parentId;
        this.category = category;
        this.name = name;
        this.order = order;
        this.url = url;
        this.target = target;
        this.type = type;
        this.blockType = blockType;
        this.file = file;
        this.translations = [...translations];
        this.isActive = isActive;
        this.createdAt = createdAt;
        this.image = image;
    }

    public static columns = [
        'id',
        'name',
        'category',
        'order',
        'isActive',
        'details',
        // 'createdAt',
    ];
}
