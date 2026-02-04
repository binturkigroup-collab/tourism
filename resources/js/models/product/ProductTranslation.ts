import SelectItemsProps from "@/Interfaces/SelectItemsProps";

class ProductTranslation implements SelectItemsProps {
    id: number;
    productId: number;
    name: string;
    description: string;
    language: string;
    isActive: boolean;
    constructor({
                    id = -1,
                    productId = -1,
                    name = '',
                    description = '',
                    language = '',
                    isActive = false,
                }) {
        this.id = id;
        this.productId = productId;
        this.name = name;
        this.description = description;
        this.language = language;
        this.isActive = isActive;
    }
}

export default ProductTranslation;
