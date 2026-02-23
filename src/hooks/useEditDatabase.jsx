// src/hooks/useEditDatabase.js
import { axiosClient } from "../api/axiosClient";
import { useNotificationContext } from "../context/NotificationContext";

const useEditDatabase = () => {
  const { showNotification } = useNotificationContext();

  // Nhận vào 1 Object chứa toàn bộ đồ nghề
  const executeEdit = async ({ editData, setEditingDb, fetchDatabases }) => {
    // Chốt chặn an toàn: Rỗng là chửi!
    if (!editData || !editData.id) {
      console.error("LỖI LOGIC: Truyền thiếu data vào hàm Sửa rồi ông ơi!");
      return;
    }

    try {
      // Gọi API PUT (hoặc PATCH) để cập nhật
      await axiosClient.put(`/databases/${editData.id}`, editData);
      showNotification("success", "Cập nhật thông tin thành công!");

      setEditingDb(null); // Đóng Modal
      fetchDatabases(); // Load lại bảng ngay lập tức
    } catch (error) {
      console.error("Lỗi edit:", error);
      showNotification("error", "Sửa thất bại, check lại API đi!");
      throw error; // Ném lỗi ra để thằng AsyncButton biết đường mà tắt Loading
    }
  };

  return { executeEdit };
};

export default useEditDatabase;
