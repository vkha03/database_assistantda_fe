// src/hooks/useActiveDatabase.js
import { axiosClient } from "../api/axiosClient";
import { useNotificationContext } from "../context/NotificationContext";

const useActiveDatabase = () => {
  const { showNotification } = useNotificationContext();

  // Chỉ cần truyền ID và hàm load lại bảng
  const executeActive = async (id, fetchDatabases) => {
    if (!id) {
      console.error("LỖI LOGIC: Không có ID để kích hoạt!");
      return;
    }

    try {
      // Tùy vào Backend của ông viết API như thế nào, tôi đang giả sử là PATCH
      await axiosClient.patch(`/databases/${id}/active`);

      showNotification("success", "Đã kích hoạt Database thành công!");
      fetchDatabases(); // Load lại bảng để thằng DB này biến thành màu Xanh lá
    } catch (error) {
      console.error("Lỗi Active DB:", error);
      showNotification("error", "Kích hoạt thất bại, xem lại Network nhé!");
      throw error; // Ném ra cho thằng AsyncButton nó biết đường tắt Loading
    }
  };

  return { executeActive };
};

export default useActiveDatabase;
