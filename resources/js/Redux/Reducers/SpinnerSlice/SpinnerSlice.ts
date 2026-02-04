import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    spinner: false,
}

const SpinnerSlice = createSlice({
    name: 'spinner',
    initialState,
    reducers: {
        setSpinner: (state, action: PayloadAction<boolean>) => {
            state.spinner = action.payload;
        }
    }
})

export const {
    setSpinner,
} = SpinnerSlice.actions;

export default SpinnerSlice.reducer;
