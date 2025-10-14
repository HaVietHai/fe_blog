import { configureStore } from "@reduxjs/toolkit";
import { StorageService } from "../services/storage.service";
import type { AuthState } from "../types/user.type";
import authReducer from './slices/auth.slice'


const authItem = StorageService.getItem('auth');
let initialState: AuthState = {
    current: null,
    isLoggedIn: false
};

if (authItem) {
    initialState = {
        current: { email: authItem.email , username: authItem.username},
        isLoggedIn: true
    }
}

export const store = configureStore({
    reducer:{
        auth: authReducer
    },
    preloadedState:{
        auth: initialState
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;