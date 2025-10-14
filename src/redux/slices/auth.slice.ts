import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthState, IUser } from "../../types/user.type";

    
const initialState: AuthState = {
    current: null,
    isLoggedIn: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<IUser>) =>{
            state.current = action.payload;
            state.isLoggedIn = true;
        },
        logout: (state, action: PayloadAction<IUser>) =>{
            state.current = null,
            state.isLoggedIn = false;
        }
    },
})

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;