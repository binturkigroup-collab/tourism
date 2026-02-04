import {PageProps, User} from "@/types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "@/Redux/Store/store";

const dummyUser= {
    user: {
        id: -1,
        email: '',
        avatar: '',
        isActive: false,
        type: '',
    },

}

const initialState = dummyUser;

const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        getUser: (state, action: PayloadAction<User>) => {
            state.user = {...action.payload};
        }
    }
})

export const {
    getUser,
} = UserSlice.actions;

export const selectedUser = (state: RootState) => state.user.user;

export default UserSlice.reducer;
