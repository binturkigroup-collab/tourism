import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "@/Redux/Store/store";
import Account from "@/models/account/Account";

const dummyAccounts : {accounts: Account[]} = {
    accounts : [],
};

const initialState = dummyAccounts;

const accountSlice = createSlice({
    name: 'accounts',
    initialState,
    reducers: {
        implementedAccounts : (state, action: PayloadAction<Account[]>) => {
            state.accounts = [...action.payload];
        },

        addAccount: (state, action: PayloadAction<Account>) => {
            state.accounts = [...state.accounts, action.payload];
        }
    },

});

export const {
    implementedAccounts,
    addAccount,
} = accountSlice.actions;
export const recentAccounts = (state: RootState) => state.accounts.accounts;

export default accountSlice.reducer;
