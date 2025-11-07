import { follow, inforFriend, login, register, sendOtp, unfollow, verifyOtp } from "../api/user.api";
import { STORAGE_KEY_AUTH_BLOG } from "../constants/key.constant";
import type {IFollow, ILogin, IRegitser, ISendMail, IUser, OTPCodeRequestDto } from "../types/user.type";
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

export const handleGetInforFriend = async(id: string):Promise<IUser> =>{
    return await inforFriend(id)
}

export const handleFollowOrUnFollow = async (data: IFollow, choice: number): Promise<void> => {
  if (choice === 1) {
    // Follow
    return await follow({
      currentUserId: data.currentUserId,
      targetUserId: data.targetUserId,
    });
  } else if (choice === 2) {
    // Unfollow
    return await unfollow({
      currentUserId: data.currentUserId,
      targetUserId: data.targetUserId,
    });
  } else {
    throw new Error("Choice không hợp lệ (chỉ nhận 1 hoặc 2)");
  }
};
