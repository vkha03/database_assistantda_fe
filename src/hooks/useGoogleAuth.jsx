import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useNotificationContext } from "../context/NotificationContext";

export const useGoogleAuth = () => {
  const baseURL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

  const { setLoadingAuth, setAccessToken, setUser } = useAuthContext();
  const { showNotification } = useNotificationContext();
  const navigate = useNavigate();

  const handleGoogleLogin = async (credentialResponse, onClose) => {
    const idToken = credentialResponse.credential;
    setLoadingAuth(true);

    try {
      // Axios tự parse JSON, dữ liệu nằm trong cục .data
      // Lưu ý: data ở đây là response từ Backend (chứa { status, data: { accessToken, user } })
      const response = await axios.post(
        `${baseURL}/auth/google`,
        { idToken },
        { withCredentials: true },
      );

      // Giả sử backend trả về: { status: "success", data: { user, accessToken } }
      const { user, accessToken } = response.data.data;

      setAccessToken(accessToken);
      setUser({ id: user.id, email: user.email, role: user.role });
      showNotification("success", "Đăng nhập thành công");
      onClose();
      console.log("✅ Đăng nhập thành công, chuyển hướng...");
      navigate("/dashboard");
    } catch (error) {
      console.error(
        "❌ Lỗi Google Login:",
        error?.response?.data?.message || error.message,
      );
      showNotification(
        "error",
        error?.response?.data?.message || "Lỗi tại GoogleAuthLogin",
      );
    } finally {
      setLoadingAuth(false);
    }
  };

  return { handleGoogleLogin };
};
