import { configureStore } from "@reduxjs/toolkit";
import { StorageService } from "../services/storage.service";
import type { AuthState, OtpState } from "../types/user.type";
import authReducer from './slices/auth.slice'
import otpReducer from './slices/otp.slice';
import { STORAGE_KEY_AUTH_BLOG, STORAGE_KEY_OTP } from "../constants/key.constant";


const authItem = StorageService.getItem(STORAGE_KEY_AUTH_BLOG);
let initialStateAuth: AuthState = {
    current: null,
    isLoggedIn: false
};

if (authItem) {
    initialStateAuth = {
        current: { email: authItem.email , username: authItem.username},
        isLoggedIn: true
    }
}

const otpItem = StorageService.getItem(STORAGE_KEY_OTP);
let initialStateOtp: OtpState = {
    verified: false
};

if (otpItem) {
    initialStateOtp = {
        verified: true
    }
}


export const store = configureStore({
    reducer:{
        auth: authReducer,
        otp: otpReducer
    },
    preloadedState:{
        auth: initialStateAuth,
        otp: initialStateOtp
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;