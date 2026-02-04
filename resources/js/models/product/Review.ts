export default class Review {
    id: number;
    userId: number;
    productId: number;
    name: string;
    avatar: string;
    review: string;
    isActive: boolean;
    createdAt: string;

    constructor({
                    id = -1,
                    userId = -1,
                    productId = -1,
                    name = '',
                    avatar = '',
                    review = '',
                    isActive = false,
                    createdAt = '',
                }) {
        this.id = id;
        this.userId = userId;
        this.productId = productId;
        this.name = name;
        this.avatar = avatar;
        this.review = review;
        this.isActive = isActive;
        this.createdAt = createdAt;
    }
}
