import { createContext, useContext, useState, useEffect, useMemo } from "react";
import axios from "axios";
import { setLocalAccessToken } from "../services/TokenService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const baseURL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";
  const [user, setUser] = useState(null); // Gom id, email, role vào 1 object cho gọn
  const [accessToken, setAccessToken] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
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
        setLocalAccessToken(accessToken);
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

  // Tối ưu hiệu năng: Chỉ khi user/token đổi thì context value mới đổi
  const contextValue = useMemo(
    () => ({
      user,
      accessToken,
      setAccessToken,
      setUser,
      loadingAuth,
      setLoadingAuth,
    }),
    [user, accessToken, loadingAuth],
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
