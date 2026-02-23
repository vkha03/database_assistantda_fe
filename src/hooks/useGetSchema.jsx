// src/hooks/useGetSchema.js
import { axiosClient } from "../api/axiosClient";
import { useNotificationContext } from "../context/NotificationContext";

const useGetSchema = () => {
  const { showNotification } = useNotificationContext();

  const fetchSchema = async (fetchDatabases) => {
    // if (!dbId) {
    //   console.error("LỖI LOGIC: Truyền thiếu ID của Database rồi!");
    //   return;
    // }

    try {
      // Gọi API lấy cấu trúc DB (Nhớ sửa lại URL cho chuẩn với Backend của ông)
      await axiosClient.post(`/databases/update-schema`);

      fetchDatabases();
      showNotification("success", "Lấy cấu trúc database thành công");
    } catch (error) {
      console.error("Lỗi lấy Schema:", error);
      showNotification(
        "error",
        "Không lấy được cấu trúc DB. Check lại kết nối!",
      );
    }
  };

  // Trả về cả Hàm gọi API lẫn 2 cái State để ngoài Page xài
  return { fetchSchema };
};

export default useGetSchema;
