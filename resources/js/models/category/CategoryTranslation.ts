import SelectItemsProps from "@/Interfaces/SelectItemsProps";

class CategoryTranslation implements SelectItemsProps{
    id: number;
    categoryId: number;
    name: string;
    description: string;
    language: string;
    isActive: boolean;
    constructor({
                    id = -1,
                    categoryId = -1,
                    name = '',
                    description = '',
                    language = '',
                    isActive = false,
                }) {
        this.id = id;
        this.categoryId = categoryId;
        this.name = name;
        this.description = description;
        this.language = language;
        this.isActive = isActive;
    }
}

export default CategoryTranslation;
