import { login, register } from "../api/user.api";
import type { ILogin, IRegitser, IUser } from "../types/user.type";
import { StorageService } from "./storage.service";

export const handleLogin = async (loginDto: ILogin): Promise<void> => {
    const data = await login(loginDto);
    if (data?.access_token) {
        StorageService.setItem("auth_blog", data);
    }
}

export const handleRegister = async (regitserDto: IRegitser): Promise<IUser> => {
    return await register(regitserDto)
}