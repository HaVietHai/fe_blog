import type { AxiosInstance } from "axios";
import axios from "axios";
import { StorageService } from "../services/storage.service";
import type { LoginDtoResponse } from "../types/user.type";
import { STORAGE_KEY_AUTH_BLOG } from "../constants/key.constant";

const client: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    "Accept-Language": ["vi", "en"],
    "X-Requested-With": "XMLHttpRequest"
  }
});

// ✅ axios riêng để refresh (không interceptor)
const refreshClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
});

let isRefreshing = false;
let refreshSubscribers: any[] = [];

const onRefreshed = (token: string) => {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
};

client.interceptors.request.use(
  (config) => {
    const auth = StorageService.getItem(STORAGE_KEY_AUTH_BLOG);
    if (auth && config.headers) {
      config.headers.Authorization = `Bearer ${auth.access_token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

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
              originalRequest.headers["Authorization"] = `Bearer ${token}`;
              resolve(client(originalRequest));
            });
          });
        }
      }

      isRefreshing = true;
      const auth: LoginDtoResponse = StorageService.getItem(STORAGE_KEY_AUTH_BLOG);
      if (!auth?.refresh_token) {
        StorageService.clearItem(STORAGE_KEY_AUTH_BLOG);
        window.location.href = "/login";
        return Promise.reject(error);
      }

      try {
        const params = new URLSearchParams();
        params.append("grant_type", "refresh_token");
        params.append("refresh_token", auth.refresh_token);

        const result = await refreshClient.post("api/v1/auth/token/refresh", params);
        // ✅ Lưu lại token mới
        StorageService.setItem(STORAGE_KEY_AUTH_BLOG, result.data || result);
        isRefreshing = false;

        const newAccessToken = result.data?.access_token || result.access_token;
        onRefreshed(newAccessToken);

        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return client(originalRequest);
      } catch (err) {
        isRefreshing = false;
        StorageService.clearItem(STORAGE_KEY_AUTH_BLOG);
        window.location.href = "/login";
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

// ✅ Tự động refresh mỗi 1 phút
setInterval(async () => {
  const auth = StorageService.getItem(STORAGE_KEY_AUTH_BLOG);
  if (auth?.refresh_token) {
    try {
      const params = new URLSearchParams();
      params.append("grant_type", "refresh_token");
      params.append("refresh_token", auth.refresh_token);
      const result = await refreshClient.post("api/v1/auth/token/refresh", params);
      StorageService.setItem(STORAGE_KEY_AUTH_BLOG, result.data || result);
      console.log("🔄 Token đã được refresh tự động!");
    } catch (e) {
      console.error("❌ Refresh token thất bại:", e);
      StorageService.clearItem(STORAGE_KEY_AUTH_BLOG);
      window.location.href = "/login";
    }
  }
}, 1000 * 60);

export default client;
