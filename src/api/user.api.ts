import type { ILogin, IRegitser, ISendMail, IUser, LoginDtoResponse, OTPCodeRequestDto } from "../types/user.type";
import client from "./client.api";

export const login = async(dto: ILogin):Promise<LoginDtoResponse> =>{
    return await client.post('/api/v1/auth/login', dto);
}

export const register = async(dto: IRegitser):Promise<IUser> => {
    return await client.post('/api/v1/auth/register', dto);
}

export const sendOtp = async(dto: ISendMail):Promise<ISendMail> =>{
    return await client.post('/api/v1/auth/send-otp', dto);
}

export const verifyOtp = async(dto: OTPCodeRequestDto):Promise<OTPCodeRequestDto> =>{
    return await client.post('/api/v1/auth/verify-otp',dto);
}
