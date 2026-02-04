import LocaleProduct from "@/models/product/LocaleProduct";

export interface ICartProduct {
    quantity: number;
    product: LocaleProduct;
    price: number;
}

export interface ICart {
    openCart: boolean;
    cart: ICartProduct [];
}
