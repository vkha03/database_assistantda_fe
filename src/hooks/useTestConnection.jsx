// src/hooks/useTestConnection.js
import { axiosClient } from "../api/axiosClient";
import { useNotificationContext } from "../context/NotificationContext";

const useTestConnection = () => {
  const { showNotification } = useNotificationContext();

  const executeTest = async () => {
    // Gác cổng: Không có ID thì đuổi về
    // if (!id) {
    //   console.error("LỖI LOGIC: Không có ID để test kết nối!");
    //   return;
    // }

    try {
      // Gọi API xuống Backend để nó thử Ping vào Database
      // Lưu ý: Sửa lại endpoint '/databases/${id}/test' cho khớp với Router của ông
      const response = await axiosClient.post(`/databases/test-connection`);

      showNotification(
        "success",
        "Ping thành công! Database đang thở ngon lành.",
      );

      return response.data; // Trả về data (nếu cần dùng làm gì đó sau này)
    } catch (error) {
      console.error("Lỗi Test Connection:", error);
      // Backend văng 400/500 do sai Pass, sai Port, sập Host...
      showNotification(
        "error",
        "Kết nối thất bại! Sai thông tin hoặc Database sập rồi.",
      );
      throw error; // Phải ném lỗi ra để thằng AsyncButton biết mà tắt cái vòng xoay Loading
    }
  };

  return { executeTest };
};

export default useTestConnection;
