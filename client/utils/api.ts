import axios, { AxiosInstance } from "axios";
import { useAuth } from "@clerk/clerk-expo";
import { UpdateUser } from "@/types";

export const API_BASE_URL = "https://bill-payment-one.vercel.app/api";
//  = "https://bill-payment-one.vercel.app/api";
// ! 🔥 localhost api would not work on your actual physical device
// const API_BASE_URL = "http://localhost:5001/api";

// this will basically create an authenticated api, pass the token into our headers

export const createApiClient = (
  getToken: () => Promise<string | null>
): AxiosInstance => {
  const api = axios.create({ baseURL: API_BASE_URL });

  api.interceptors.request.use(async (config) => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return api;
};

export const useApiClient = (): AxiosInstance => {
  const { getToken } = useAuth();
  return createApiClient(getToken);
};

export const userApi = {
  syncUser: (api: AxiosInstance) => api.post("/users"),
  AddcustomerCode: (api: AxiosInstance) =>
    api.post("/user/customercode"),
  getCurrentUser: (api: AxiosInstance) => api.get("/user/find"),
  updateuser: (api: AxiosInstance, userdata: UpdateUser) =>
    api.put("/user/update", userdata),
  validateuser: (api: AxiosInstance) =>
    api.post("/user/validatepaystack"),
};

export const receiverApi = {
  getReceiver: (api: AxiosInstance, username: string | undefined) =>
    api.get(`/user/find/${username}`),
};

export const transactionsApi = {
  getUserTransactions: (
    api: AxiosInstance,
    username: string | undefined,
    limit: number
  ) => api.get(`/transactions/${username}?limit=${limit}`),
  getTransaction: (api: AxiosInstance, id: number | undefined) =>
    api.get(`/transaction/${id}`),
};
