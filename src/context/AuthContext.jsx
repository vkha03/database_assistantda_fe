import { createContext, useContext, useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { setLocalAccessToken } from "../services/TokenService";
import { useNotificationContext } from "./NotificationContext";
import { setAxiosToken, subscribeTokenRefresh } from "../api/axiosClient";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const baseURL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";
  const [user, setUser] = useState(null); // Gom id, email, role vào 1 object cho gọn
  const [accessToken, setAccessToken] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const { showNotification } = useNotificationContext();
  const navigate = useNavigate();

  useEffect(() => {
    const initAuth = async () => {
      try {
        setLoadingAuth(true);

        // Gọi refresh token ngầm khi vừa load trang
        // Không cần ghi URL dài dòng vì axiosClient đã lo phần /api và base URL
        const res = await axios.post(
          `${baseURL}/auth/refresh`,
          {},
          {
            withCredentials: true,
          },
        );
        const { accessToken, user } = res.data.data;

        setAccessToken(accessToken);
        setUser(user);
        setAxiosToken(accessToken);
        subscribeTokenRefresh(setAccessToken);
      } catch (err) {
        console.error("Bạn chưa đăng nhập");
        setAccessToken(null);
        setUser(null);
      } finally {
        setLoadingAuth(false);
      }
    };
    initAuth();
  }, []);

  const logout = async () => {
    try {
      const res = await axios.get(`${baseURL}/auth/logout`, {
        withCredentials: true,
      });

      setAccessToken(null);
      setUser(null);
      setAxiosToken(null);
      showNotification("success", "Đăng xuất thành công");
      navigate("/");
    } catch (error) {
      console.log(error);
      showNotification(
        "error",
        error?.response?.data?.message || "Lỗi đăng xuất",
      );
    }
  };

  // Tối ưu hiệu năng: Chỉ khi user/token đổi thì context value mới đổi
  const contextValue = useMemo(
    () => ({
      user,
      accessToken,
      setAccessToken,
      setUser,
      loadingAuth,
      setLoadingAuth,
      logout,
    }),
    [user, accessToken, loadingAuth],
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
