import { GoogleLogin } from "@react-oauth/google";
import { useGoogleAuth } from "../hooks/useGoogleAuth";

const LoginModal = ({ onClose }) => {
  const { handleGoogleLogin } = useGoogleAuth();

  return (
    // THẺ 1: Nền mờ (Backdrop) - Dùng class animate-backdrop
    <div
      className="modal show d-block animate-backdrop"
      tabIndex="-1"
      style={{
        zIndex: 1050,
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
      }}
    >
      {/* THẺ 2: Wrapper - Gắn modal-lg ở đây để giữ form to, và gắn animate-pop-in ở đây để tránh xung đột CSS */}
      <div className="modal-dialog modal-dialog-centered modal-lg animate-pop-in">
        {/* THẺ 3: Nội dung form (Card trắng) */}
        <div className="modal-content border-0 shadow-lg rounded-4 overflow-hidden w-60">
          {/* Nút X Đóng Modal */}
          <button
            type="button"
            className="btn-close position-absolute top-0 end-0 m-3 shadow-none"
            onClick={onClose}
            style={{ zIndex: 10 }}
          ></button>

          <div className="row g-0">
            {/* CỘT TRÁI: Branding (Ẩn trên mobile) */}
            <div className="col-md-5 bg-light p-4 d-none d-md-flex flex-column justify-content-between border-end">
              <div>
                <div
                  className="bg-dark text-white rounded d-inline-flex align-items-center justify-content-center fw-bold mb-3"
                  style={{ width: "40px", height: "40px" }}
                >
                  DB
                </div>
                <h5
                  className="fw-bold text-dark mb-1"
                  style={{ letterSpacing: "-0.5px" }}
                >
                  Assistant <span className="text-muted fw-normal">Pro</span>
                </h5>
                <p className="text-muted" style={{ fontSize: "0.85rem" }}>
                  Nền tảng AI-SQL thông minh.
                </p>
              </div>

              <div className="mt-4">
                <div
                  className="text-uppercase text-muted fw-bold mb-3"
                  style={{ fontSize: "0.7rem", letterSpacing: "0.5px" }}
                >
                  Đặc quyền hội viên
                </div>
                <ul
                  className="list-unstyled text-dark mb-0 font-monospace"
                  style={{ fontSize: "0.8rem" }}
                >
                  <li className="mb-3 d-flex align-items-center gap-2">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Lưu trữ Schema & Query
                  </li>
                  <li className="mb-3 d-flex align-items-center gap-2">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Context Window mở rộng
                  </li>
                  <li className="d-flex align-items-center gap-2">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Tự động tối ưu hiệu suất
                  </li>
                </ul>
              </div>
            </div>

            {/* CỘT PHẢI: Nút Google Login */}
            <div className="col-md-7 p-4 p-md-5 d-flex flex-column justify-content-center bg-white relative">
              <div className="text-center mb-4 mt-2">
                <h4 className="fw-bold text-dark mb-2">Chào mừng trở lại</h4>
                <p className="text-muted" style={{ fontSize: "0.9rem" }}>
                  Đăng nhập an toàn để truy cập Workspace.
                </p>
              </div>

              <div className="d-flex justify-content-center mb-4">
                <GoogleLogin
                  onSuccess={(res) => handleGoogleLogin(res, onClose)}
                  onError={() => console.error("Lỗi đăng nhập Google từ FE")}
                  useOneTap
                  theme="outline"
                  shape="rectangular"
                  size="large"
                  text="continue_with"
                />
              </div>

              <div className="text-center mt-auto pt-4 border-top">
                <p className="text-muted mb-0" style={{ fontSize: "0.75rem" }}>
                  Bằng việc đăng nhập, bạn đồng ý với{" "}
                  <a
                    href="#"
                    className="text-dark fw-medium text-decoration-none"
                  >
                    Điều khoản dịch vụ
                  </a>{" "}
                  và{" "}
                  <a
                    href="#"
                    className="text-dark fw-medium text-decoration-none"
                  >
                    Chính sách bảo mật
                  </a>{" "}
                  của chúng tôi.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
