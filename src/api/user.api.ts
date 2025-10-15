import type { ILogin, IRegitser, IUser, LoginDtoResponse } from "../types/user.type";
import client from "./client.api";

export const login = async(dto: ILogin):Promise<LoginDtoResponse> =>{
    return await client.post('/api/v1/auth/login', dto)
}

export const register = async(dto: IRegitser):Promise<IUser> => {
    return await client.post('/api/v1/auth/register', dto)
}