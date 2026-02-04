import LocaleProduct from "@/models/product/LocaleProduct";
import ItemOffer from "@/models/offer/ItemOffer";

class OrderDetail {
    id: number;
    product: LocaleProduct;
    quantity: number;
    price: number;
    offer: ItemOffer | null;

    constructor({
                    id = -1,
                    product = new LocaleProduct({}),
                    quantity = 0,
                    price = 0,
                    offer = null,
                }) {
        this.id = id;
        this.product = {...product};
        this.quantity = quantity;
        this.price = price;
        this.offer = offer;
    }
}

export default OrderDetail;
