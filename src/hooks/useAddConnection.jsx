import { useState } from "react";
import { axiosClient } from "../api/axiosClient";
import { useNotificationContext } from "../context/NotificationContext";

const useAddConnection = () => {
  const { showNotification } = useNotificationContext();

  // 1. STATE NỘI BỘ CỦA COMPONENT
  const [formData, setFormData] = useState({
    db_host: "",
    db_port: "3306",
    db_name: "",
    db_user: "",
    db_password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword(!showPassword);

  // 2. HANDLER LOGIC
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async (onClose) => {
    if (!formData.db_host || !formData.db_user || !formData.db_name) {
      showNotification(
        "error",
        "Vui lòng điền đủ Host, Username và Tên Database!",
      );
      return;
    }
    try {
      // Dùng axiosClient đã được custom
      const res = await axiosClient.post("/databases", formData);
      showNotification("success", res.data.message || "Thêm thành công");
      onClose(); // Đóng Modal khi thêm thành công
    } catch (error) {
      console.error(
        "❌ Lỗi thêm mới:",
        error?.response?.data?.message || error.message,
      );
      showNotification(
        "error",
        error?.response?.data?.message || "Lỗi thêm mới",
      );
    }
  };

  return {
    handleInputChange,
    handleSave,
    formData,
    showPassword,
    togglePassword,
  };
};

export default useAddConnection;
