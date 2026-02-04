import UserShort from "@/models/User/UserShort";
import LocaleProduct from "@/models/product/LocaleProduct";

export interface LocaleProductActivity extends LocaleProduct {
    date: string;
}

export interface RatingProductActivity extends LocaleProductActivity {
    rating: number;
}

export interface ReviewProductActivity extends LocaleProductActivity {
    review: string;
}

interface IUserProductActivities {
    user: UserShort,
    likes: LocaleProductActivity [],
    favorites: LocaleProductActivity [],
    ratings: RatingProductActivity [],
    reviews: ReviewProductActivity [],
}

export default IUserProductActivities;
