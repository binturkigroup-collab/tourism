import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const siteSidebar: {open: boolean} = {
    open: false,
}

const initialState = siteSidebar;

const siteSideSlice = createSlice({
    name: "siteSidebar",
    initialState,
    reducers: {
        setSiteSidebar: (state, action: PayloadAction<boolean>) => {
            state.open = action.payload
        }
    },
});

export const {
    setSiteSidebar,
} = siteSideSlice.actions;

export default siteSideSlice.reducer;
