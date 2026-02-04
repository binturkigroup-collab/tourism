export default class Rating {
    id: number;
    userId: number;
    productId: number;
    rate: number;

    constructor({
        id = -1,
        userId = -1,
        productId = -1,
        rate = 0
                }) {
        this.id = id;
        this.userId = userId;
        this.productId = productId;
        this.rate = rate;
    }
}
