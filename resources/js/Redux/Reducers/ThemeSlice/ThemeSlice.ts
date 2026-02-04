import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {PaletteMode} from "@mui/material";

const initialState: {dark: boolean, mode: PaletteMode} = {
    dark: true,
    mode: "dark",
}

const ThemeSlice = createSlice({
    name: "mode",
    initialState,
    reducers: {
        setMode: (state, action: PayloadAction<boolean>) => {
            state.dark = action.payload;
            state.mode = action.payload ? 'dark' : 'light';
        }
    }
});

export const {
    setMode,
} = ThemeSlice.actions;

export default ThemeSlice.reducer;
