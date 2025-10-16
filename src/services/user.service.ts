import { login, register, sendOtp, verifyOtp } from "../api/user.api";
import { STORAGE_KEY_AUTH_BLOG, STORAGE_KEY_OTP } from "../constants/key.constant";
import type { ILogin, IRegitser, ISendMail, IUser, OTPCodeRequestDto } from "../types/user.type";
import { StorageService } from "./storage.service";

export const handleLogin = async (loginDto: ILogin): Promise<void> => {
    const data = await login(loginDto);
    if (data?.access_token) {
        StorageService.setItem(STORAGE_KEY_AUTH_BLOG, data);
    }
}

export const handleRegister = async (regitserDto: IRegitser): Promise<IUser> => {
    return await register(regitserDto);
}

export const handleSendOtp = async(sendRequestDto: ISendMail): Promise<ISendMail> =>{
    return await sendOtp(sendRequestDto);
}


export const handleVerifyOtp = async(otpRequestDto: OTPCodeRequestDto): Promise<OTPCodeRequestDto> =>{
    return await verifyOtp(otpRequestDto);
}