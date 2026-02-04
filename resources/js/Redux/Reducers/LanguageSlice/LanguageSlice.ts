import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "@/Redux/Store/store";
import Language from "@/models/language/Language";

const dummyLanguages: {languages: Language[], language: string, direction: 'rtl' | 'ltr'} = {
    languages: [],
    language: 'en',
    direction: 'ltr',
}

const initialState = dummyLanguages;

const languageSlice = createSlice({
    name: "languages",
    initialState,
    reducers: {
        setLanguages: (state, action: PayloadAction<Language[]>) => {
            state.languages = [...action.payload];
        },

        setLanguage: (state, action: PayloadAction<string>) => {
            state.language = action.payload;
        },

        setDirection: (state, action: PayloadAction<'ltr' | 'rtl'>) => {
            state.direction = action.payload;
        },
    }
})

export const {
    setLanguages,
    setLanguage,
    setDirection,
} = languageSlice.actions;

export const currentLanguage = (state) => state.languages.languages;

export default languageSlice.reducer;
