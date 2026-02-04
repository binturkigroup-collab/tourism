export default class Like {
    id: number;
    userId: number;
    productId: number;
    like: boolean;

    constructor({
                    id = -1,
                    userId = -1,
                    productId = -1,
                    like = false
                }) {
        this.id = id;
        this.userId = userId;
        this.productId = productId;
        this.like = like;
    }
}
