import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import Coupon from "@/models/coupon/Coupon";

const initialState = {
    code: '',
    amount: 0,
    isPercent: false,
    valid: false,
}

const CouponSlice = createSlice({
    name: 'coupon',
    initialState,
    reducers: {
        setCoupon: (state, action: PayloadAction<Coupon>) => {
            state.code = action.payload.code;
            state.amount = action.payload.amount;
            state.isPercent = action.payload.isPercent;
            state.valid = action.payload.valid;
        },

        clearCoupon: (state) => {
            state.code = '';
            state.amount = 0;
            state.isPercent = false;
            state.valid = false;
        },
    },
});

export const {setCoupon, clearCoupon} = CouponSlice.actions;

export default CouponSlice.reducer;
