import ProductTranslation from "@/models/product/ProductTranslation";
import File from "@/models/files/File";
import Category from "@/models/category/Category";
import LocaleCategory from "@/models/category/LocaleCategory";
import Review from "@/models/product/Review";
import Offer from "@/models/offer/Offer";
import Like from "@/models/product/Like";
import Favorite from "@/models/product/Favorite";
import Rating from "@/models/product/Rating";

class LocaleProduct {
    id: number;
    name: string;
    description: string;
    categoryId: number;
    order: number;
    sellPrice: number;
    originalPrice: number;
    count: number;
    sku: string;
    images: File [];
    createdAt: string;
    category: LocaleCategory;
    reviews: Review [];
    offer: Offer | null;
    likes: Like [];
    favorites: Favorite [];
    ratings: Rating [];
    average: number;

    constructor({
                    id = -1,
                    name = '',
                    description = '',
                    categoryId = -1,
                    order = 0,
                    sellPrice = 0,
                    originalPrice = 0,
                    count = 0,
                    sku = '',
                    images = [] as File [],
                    createdAt = '',
                    category = new LocaleCategory({}),
                    reviews = [] as Review [],
                    offer = null,
                    likes = [] as Like [],
                    favorites = [] as Favorite [],
                    ratings = [] as Rating [],
                    average = 0,
                }) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.categoryId = categoryId;
        this.order = order;
        this.sellPrice = sellPrice;
        this.originalPrice = originalPrice;
        this.count = count;
        this.sku = sku;
        this.images = [...images];
        this.createdAt = createdAt;
        this.category = {...category};
        this.reviews = [...reviews];
        this.offer = offer;
        this.likes = [...likes];
        this.favorites = [...favorites];
        this.ratings = [...ratings];
        this.average = average;
    }
}

export default LocaleProduct;
