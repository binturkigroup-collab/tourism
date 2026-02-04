import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import LocaleProduct from "@/models/product/LocaleProduct";

const initialState = {
  products: [] as LocaleProduct [],
    loading: false,
}

const localeProductSlice = createSlice({
    name: 'localProduct',
    initialState,
    reducers: {
        setProducts: (state, action: PayloadAction<LocaleProduct []>) => {
            state.products = action.payload;
        },

        appendProducts: (state, action: PayloadAction<LocaleProduct []>) => {
            state.products = [...state.products, ...action.payload];
        },

        resetProducts: (state) => {
            state.products = [] as LocaleProduct [];
        },

        setLoading: (state) => {
            state.loading = true;
        },

        stopLoading: (state) => {
            state.loading = false;
        }

    }
});

export const {
    setProducts,
    appendProducts,
    resetProducts,
    setLoading,
    stopLoading,
} = localeProductSlice.actions;

export default localeProductSlice.reducer;
