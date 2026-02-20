import { createContext, useContext, useCallback } from "react";
import { toast } from "sonner";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  // Dùng useCallback để hàm này không bị tạo lại mỗi lần Provider re-render
  const showNotification = useCallback((status, message) => {
    // Định nghĩa style nhanh dựa trên status
    const getStyle = (s) => {
      switch (s) {
        case "success":
          return { border: "1px solid #10b981", accent: "#10b981" };
        case "error":
          return { border: "1px solid #f43f5e", accent: "#f43f5e" };
        default:
          return { border: "1px solid #3b82f6", accent: "#3b82f6" };
      }
    };

    const styleConfig = getStyle(status);

    // Gọi trực tiếp toast ở đây, không cần qua State hay useEffect
    toast(message, {
      style: {
        background: "rgba(15, 23, 42, 0.95)",
        backdropFilter: "blur(12px)",
        color: "#ffffff",
        border: styleConfig.border,
        borderLeft: `6px solid ${styleConfig.accent}`,
        borderRadius: "12px",
        padding: "16px",
        fontWeight: "600",
      },
      // Ông có thể thêm icon ở đây nếu muốn, nhưng nên tách ra component riêng
    });
  }, []);

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = () => useContext(NotificationContext);
