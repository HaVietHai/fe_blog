import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { OtpState } from "../../types/user.type";
import { StorageService } from "../../services/storage.service";
import { STORAGE_KEY_OTP } from "../../constants/key.constant";

const initialState:OtpState = {
    verified: StorageService.getItem(STORAGE_KEY_OTP) ?? false
};

const otpSlice = createSlice({
    name: 'otp',
    initialState,
    reducers: {
        setOtpVerified: (state, action: PayloadAction<boolean>) =>{
            state.verified = action.payload;
            StorageService.setItem(STORAGE_KEY_OTP, action.payload)
        },
        clearOtp:(state) =>{
            state.verified = false;
            StorageService.clearItem(STORAGE_KEY_OTP)
        }
    },
});

export const { setOtpVerified, clearOtp } = otpSlice.actions;
export default otpSlice.reducer;