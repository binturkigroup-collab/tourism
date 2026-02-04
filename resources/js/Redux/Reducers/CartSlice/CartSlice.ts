import React from "react";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ICart, ICartProduct} from "@/Interfaces/Site/Product/Cart";
import {Container} from "typedi";
import "reflect-metadata";
import SecureCartService from "@/Services/SecurityService/SecureCartService/SecureCartService";
import ProductService from "@/Services/ProductService/ProductService";

const initialState: ICart = {
    openCart: false,
    cart: [] as ICartProduct [],
}

const secureCartService = Container.get(SecureCartService);
const productService = Container.get(ProductService);

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setOpenCart: (state, action: PayloadAction<boolean>) => {
            state.openCart = action.payload;
        },

        addToCart: (state, action: PayloadAction<ICartProduct>) => {
            if (state.cart
                .map(c => c.product)
                .map(prod => prod.id)
                .includes(action.payload.product.id)
            ) {
                //Handle Existing Item!
                state.cart = state.cart.map(c => {
                    if (c.product.id === action.payload.product.id) {
                        return {...c, quantity: c.quantity + action.payload.quantity || 1};
                    } else {
                        return c;
                    }
                });
                secureCartService.encryptCart(state);
            } else {
                state.cart = [...state.cart, action.payload];
                secureCartService.encryptCart(state);
            }
        },

        replaceQuantity: (state, action: PayloadAction<ICartProduct>) => {
            if (state.cart
                .map(c => c.product)
                .map(prod => prod.id)
                .includes(action.payload.product.id)
            ) {
                state.cart = state.cart.map(c => {
                    if(c.product.id === action.payload.product.id) {
                        return {...c, quantity: action.payload.quantity || 1};
                    } else return c;
                });
                secureCartService.encryptCart(state);
            } else {
                state.cart = [...state.cart, action.payload];
                secureCartService.encryptCart(state);
            }
        },

        removeFromCart: (state, action: PayloadAction<number>) => {
            state.cart = state.cart.filter(item => item.product.id !== action.payload);
            secureCartService.encryptCart(state);
        },

        resetCart: (state) => {
            state.cart = [] as ICartProduct [];
            secureCartService.removeCart();
        },

        restoreCart: (state) => {
            const cart = secureCartService.decryptCart();
            if(cart) {
                state.cart = cart.cart;
            }
        },
    },
});

export const {
    setOpenCart,
    addToCart,
    replaceQuantity,
    removeFromCart,
    resetCart,
    restoreCart,
} = cartSlice.actions;

export default cartSlice.reducer;
