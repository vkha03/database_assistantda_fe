import { useState } from "react";

// Đây là một cái nút cực kỳ thông minh
const AsyncButton = ({ onClick, children, className, ...props }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async (e) => {
    // Nếu rảnh tay, không có hàm onClick truyền vào thì bỏ qua
    if (!onClick) return;

    try {
      setIsLoading(true); // Bật loading xoay xoay
      // await new Promise((resolve) => setTimeout(resolve, 1000));
      await onClick(); // Chờ cái hàm API (Promise) chạy xong
    } catch (error) {
      console.error("Lỗi khi click:", error);
    } finally {
      setIsLoading(false); // Xong xuôi thì tắt loading
    }
  };

  return (
    <button
      className={`btn ${className}`}
      onClick={handleClick}
      disabled={isLoading || props.disabled} // Đang loading thì khóa nút lại
      {...props}
    >
      {/* Nếu đang loading thì hiện spinner, không thì hiện chữ bình thường */}
      {isLoading ? (
        <>
          <span
            className="spinner-border spinner-border-sm me-2"
            role="status"
            aria-hidden="true"
          ></span>
          Đang xử lý...
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default AsyncButton;
