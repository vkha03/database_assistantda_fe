import { axiosClient } from "../api/axiosClient";
import { useNotificationContext } from "../context/NotificationContext";

const useDeleteDatabase = () => {
  const { showNotification } = useNotificationContext();

  const executeDelete = async (deletingId, setDeletingId, fetchDatabases) => {
    if (!deletingId) {
      console.error(
        "LỖI LOGIC: Không có deletingId. Check lại chỗ truyền Props đi ông nội!",
      );
      // Hoặc throw new Error("Missing deletingId");
      return;
    }
    try {
      await axiosClient.delete(`/databases/${deletingId}`);
      showNotification("success", "Đã tiễn Database về nơi an nghỉ!");

      setDeletingId(null); // Đóng Modal thành công
      fetchDatabases(); // Gọi lại Hook để vẽ lại cái Bảng (cực kỳ quan trọng!)
    } catch (error) {
      showNotification("error", "Xóa thất bại, DB này sống dai quá!");
    }
  };

  return { executeDelete };
};

export default useDeleteDatabase;
