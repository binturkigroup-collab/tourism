import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {PaletteMode} from "@mui/material";

const initialState: {dark: boolean, mode: PaletteMode} = {
    dark: false,
    mode: "light",
}

const SiteThemeSlice = createSlice({
    name: "mode",
    initialState,
    reducers: {
        setSiteMode: (state, action: PayloadAction<boolean>) => {
            state.dark = action.payload;
            state.mode = action.payload ? 'dark' : 'light';
        }
    }
});

export const {
    setSiteMode,
} = SiteThemeSlice.actions;

export default SiteThemeSlice.reducer;
