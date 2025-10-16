import type { AxiosInstance } from "axios";
import axios from "axios";
import { StorageService } from "../services/storage.service";
import type { LoginDtoResponse } from "../types/user.type";
import { STORAGE_KEY_AUTH_BLOG } from "../constants/key.constant";

const client:AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 10000, // Qua 10s timeout
    headers:{
        "Content-Type": "application/json",
        "Accept-Language": ["vi", "en"],
        "X-Requested-With": "XMLHttpRequest"
    }
})

let isRefreshing = false;
let refreshSubscribers: any[] = [];

const onRefreshed = (token: string) => {
	refreshSubscribers.forEach((cb) => cb(token));
	refreshSubscribers = [];
}

client.interceptors.request.use(
    (config) =>{
        const auth = StorageService.getItem(STORAGE_KEY_AUTH_BLOG);
        if (auth && config.headers) {
            config.headers.Authorization = `Bearer ${auth.access_token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
)

client.interceptors.response.use(
    (response) => response.data,
    async (error) => {
        if (error.response?.status === 401) {
            const originalRequest = error.config;
            if (!originalRequest._retry) {
                originalRequest._retry = true;
                if (isRefreshing) {
                    return new Promise((resolve) => {
                        refreshSubscribers.push((token: string) => {
                            originalRequest.headers['Authorization'] = `Bearer` + token;
                            resolve(client(originalRequest));
                        })
                    })
                }
            }
            isRefreshing = true;
            const auth: LoginDtoResponse = StorageService.getItem(STORAGE_KEY_AUTH_BLOG);
            if (!auth?.refresh_token) {
                StorageService.clearItem(STORAGE_KEY_AUTH_BLOG);
                window.location.href = '/login';
                return Promise.reject(error);
            }
            try {
                const params = new URLSearchParams();
                params.append('grant_type', 'refresh_token');
                params.append('refresh_token', auth.refresh_token);
                const result = await client.post(
                    'api/v1/auth/token/refresh_token',
                    params,
                    {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
                );
                StorageService.setItem(STORAGE_KEY_AUTH_BLOG, result);
                isRefreshing = false;
                onRefreshed(result.data.access_token);
                originalRequest.headers['Authorization'] = 'Bearer' + result.data.access_token;
                return client(originalRequest);
            } catch (error) {
                isRefreshing = false
                StorageService.clearItem(STORAGE_KEY_AUTH_BLOG);
                window.location.href = '/login';
                return Promise.reject(error)
            }
        }
        return Promise.reject(error)
    }
)

export default client