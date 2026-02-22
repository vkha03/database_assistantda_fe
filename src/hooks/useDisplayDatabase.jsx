import { useState, useEffect, useCallback } from "react";
import { axiosClient } from "../api/axiosClient";
import { useNotificationContext } from "../context/NotificationContext";

const useDatabases = () => {
  const [databases, setDatabases] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { showNotification } = useNotificationContext();

  // Dùng useCallback để tránh hàm bị tạo lại liên tục gây re-render vô hạn trong useEffect
  const fetchDatabases = useCallback(async () => {
    setIsLoading(true);

    try {
      // Giả định Backend của ông có API GET /databases
      const res = await axiosClient.get("/databases");

      // Tùy thuộc vào cấu trúc Backend ông viết (thường là res.data.data)
      // Nếu BE trả thẳng mảng thì dùng res.data
      const dataList = res.data.data || res.data;

      setDatabases(dataList);
    } catch (err) {
      console.error("❌ Lỗi lấy danh sách DB:", err);
      showNotification(
        "error",
        err?.response?.data?.message || "Không thể tải danh sách kết nối",
      );
    } finally {
      setIsLoading(false); // Dù lỗi hay thành công cũng phải tắt loading
    }
  }, []);

  // Tự động chạy lần đầu tiên khi Component (Page) được render
  useEffect(() => {
    fetchDatabases();
  }, [fetchDatabases]);

  return {
    databases,
    isLoading,
    fetchDatabases,
  };
};

export default useDatabases;
