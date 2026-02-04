import ProductTranslation from "@/models/product/ProductTranslation";
import File from "@/models/files/File";
import Category from "@/models/category/Category";
import Offer from "@/models/offer/Offer";

class Product {
    id: number;
    categoryId: number;
    order: number;
    isActive: boolean;
    translations: ProductTranslation [];
    sellPrice: number;
    originalPrice: number;
    count: number;
    sku: string;
    images: File [];
    createdAt: string;
    category: Category;
    extended: Category | null;
    offer: Offer | null;
    totalSales: number;
    constructor({
                    id = -1,
                    categoryId = -1,
                    order = -1,
                    isActive = false,
                    translations = ([] as ProductTranslation []),
                    sellPrice = 0,
                    originalPrice = 0,
                    count = 0,
                    sku = '',
                    images = ([] as File []),
                    createdAt = '',
                    category = new Category({}),
                    extended = null,
                    offer = null,
                    totalSales = 0,
                }) {
        this.id = id;
        this.categoryId = categoryId;
        this.order = order;
        this.isActive = isActive;
        this.translations = [...translations];
        this.sellPrice = sellPrice;
        this.originalPrice = originalPrice;
        this.count = count;
        this.sku = sku;
        this.images = [...images];
        this.createdAt = createdAt;
        this.category = category;
        this.extended = extended;
        this.offer = offer;
        this.totalSales = totalSales;
    }
}

export default Product;
