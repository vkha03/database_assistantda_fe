import axiosClient from "./axiosClient";

const chatApi = {
  // Gửi câu hỏi của user lên Node.js
  sendMessage: (message) => {
    return axiosClient.post("/chat", { message });
  },

  // Lấy lịch sử chat (nếu BE của ông có hỗ trợ)
  getHistory: () => {
    return axiosClient.get("/chat/history");
  },
};

export default chatApi;
