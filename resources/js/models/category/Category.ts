import CategoryTranslation from "@/models/category/CategoryTranslation";
import File from "@/models/files/File";
import Offer from "@/models/offer/Offer";

class Category{
    id: number;
    parentId: number | null;
    order: number;
    isActive: boolean;
    isExtended: boolean;
    translations: CategoryTranslation [];
    images: File [];
    createdAt: string;
    constructor({
                    id = -1,
                    parentId = -1,
                    order = -1,
                    isActive = false,
                    isExtended = false,
                    translations = ([] as CategoryTranslation []),
                    images = ([] as File []),
                    createdAt = '',
                }) {
        this.id = id;
        this.parentId = parentId;
        this.order = order;
        this.isActive = isActive;
        this.isExtended = isExtended;
        this.translations = [...translations];
        this.images = [...images];
        this.createdAt = createdAt;
    }
}

export default Category;
