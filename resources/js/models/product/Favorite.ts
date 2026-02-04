export default class Favorite {
    id: number;
    userId: number;
    productId: number;
    favorite: boolean;

    constructor({
                    id = -1,
                    userId = -1,
                    productId = -1,
                    favorite = false
                }) {
        this.id = id;
        this.userId = userId;
        this.productId = productId;
        this.favorite = favorite;
    }
}
