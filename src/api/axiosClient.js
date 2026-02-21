import axios from "axios";
import { toast } from "sonner";

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export const axiosClient = axios.create({
  baseURL: baseURL,
  withCredentials: true,
  timeout: 60000,
});

let inMemoryToken = null;

// Đây là "ống hút" để React Context bơm token vào
export const setAxiosToken = (token) => {
  inMemoryToken = token;
};
// ==========================================
// HỆ THỐNG HÀNG ĐỢI (VIẾT KIỂU PUB/SUB SIÊU GỌN)
// ==========================================
let isRefreshing = false;
let refreshSubscribers = []; // Mảng chứa các "lời hứa" (Promises)

// Hàm 2: Thả xích cho toàn bộ request đang chờ
const onRefreshed = (token) => {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = []; // Dọn sạch phòng chờ
};

const onRefreshFailed = (error) => {
  refreshSubscribers.forEach(({ reject }) => reject(error));
  refreshSubscribers = [];
};

// ==========================================
// REQUEST INTERCEPTOR
// ==========================================
axiosClient.interceptors.request.use((config) => {
  if (inMemoryToken) config.headers.Authorization = `Bearer ${inMemoryToken}`;
  return config;
});

// ==========================================
// RESPONSE INTERCEPTOR (DÙNG ASYNC/AWAIT THUẦN TÚY)
// ==========================================
axiosClient.interceptors.response.use(
  (response) => response?.data || response, // Rút gọn data

  async (error) => {
    const originalRequest = error.config;

    // --- BẮT LỖI 401 HẾT HẠN TOKEN ---
    if (error.response?.status === 401 && !originalRequest._retry) {
      // Kịch bản A: Đã có thằng đi xin Token -> Đứng lại chờ!
      if (isRefreshing) {
        // CHỖ ĂN TIỀN: Code dừng lại đúng ở dòng này cho đến khi có Token mới
        const newToken = await new Promise((resolve) => {
          refreshSubscribers.push(resolve);
        });

        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axiosClient(originalRequest);
      }

      // Kịch bản B: Mình là thằng đầu tiên -> Đi xin Token
      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const res = await axios.post(
          `${baseURL}/auth/refresh`,
          {},
          { withCredentials: true },
        );
        const newAccessToken = res.data.accessToken;

        // Lưu vào RAM
        setLocalAccessToken(newAccessToken);

        // Hét lên cho đám đang chờ biết: "Có thẻ mới rồi anh em ơi!"
        onRefreshed(newAccessToken);

        // Chạy lại chính mình
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosClient(originalRequest);
      } catch (err) {
        setLocalAccessToken(null);
        toast.error("Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại!");
        onRefreshFailed(err);
        // window.location.href = "/";
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    // --- BẮT LỖI GLOBAL KHÁC ---
    if (error.response?.status === 500)
      toast.error("Hệ thống AI quá tải, vui lòng thử lại!");
    if (error.response?.status === 403)
      toast.error("Ông không có quyền thực hiện thao tác này!");

    return Promise.reject(error);
  },
);
