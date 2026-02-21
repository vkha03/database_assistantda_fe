import React, { useState } from "react";
import { Link } from "react-router-dom";
import LoginModal from "../components/LoginModal";
import { useAuthContext } from "../context/AuthContext";

const HomePage = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); // STATE Ở ĐÂY
  const { user } = useAuthContext();

  return (
    <>
      {isLoginModalOpen && (
        <LoginModal onClose={() => setIsLoginModalOpen(false)} />
      )}

      <div className="bg-white min-vh-100">
        {/* ================= HERO SECTION (Bố cục Trái - Phải) ================= */}
        <div className="container px-4 py-5 mt-3">
          <div className="row align-items-center g-5 py-5">
            {/* CỘT TRÁI: Text & Nút bấm */}
            <div className="col-lg-6 text-center text-lg-start">
              <div className="badge bg-light text-dark border mb-3 py-2 px-3 rounded-pill fw-medium shadow-sm">
                <span className="text-primary me-2">✦</span> Tích hợp Google
                Gemini AI
              </div>

              <h1
                className="display-5 fw-bold lh-1 mb-4 text-dark"
                style={{ letterSpacing: "-1px" }}
              >
                Truy vấn Database bằng <br />
                <span className="text-secondary">Ngôn ngữ tự nhiên</span>
              </h1>

              <p
                className="lead fw-normal text-muted mb-5"
                style={{ fontSize: "1.1rem" }}
              >
                Nền tảng hỗ trợ Software Engineer tự động hóa việc viết SQL. Tải
                lên Schema của bạn, đặt câu hỏi, và nhận lại truy vấn chuẩn xác
                đã được AI phân tích và tối ưu hiệu suất.
              </p>

              <div className="d-grid gap-3 d-sm-flex justify-content-sm-center justify-content-lg-start">
                {user ? (
                  <Link
                    to="/workspace"
                    className="btn btn-dark btn-lg px-4 py-3 rounded-3 fw-medium shadow-sm d-flex align-items-center justify-content-center gap-2"
                  >
                    Mở Workspace
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </Link>
                ) : (
                  <button
                    onClick={() => {
                      setIsLoginModalOpen(true);
                    }}
                    className="btn btn-dark btn-lg px-4 py-3 rounded-3 fw-medium shadow-sm d-flex align-items-center justify-content-center gap-2"
                  >
                    Bắt đầu sử dụng
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </button>
                )}
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline-secondary btn-lg px-4 py-3 rounded-3 fw-medium d-flex align-items-center justify-content-center gap-2"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                  Mã nguồn
                </a>
              </div>
            </div>

            {/* CỘT PHẢI: Mockup Code Window (Cực kỳ chuyên nghiệp) */}
            <div className="col-10 col-sm-8 col-lg-6 mx-auto">
              <div
                className="rounded-4 shadow-lg overflow-hidden border border-secondary border-opacity-25"
                style={{ backgroundColor: "#0d1117" }}
              >
                {/* Thanh Header của Window */}
                <div
                  className="px-3 py-2 d-flex align-items-center border-bottom border-secondary border-opacity-25"
                  style={{ backgroundColor: "#161b22" }}
                >
                  <div className="d-flex gap-2">
                    <div
                      className="rounded-circle"
                      style={{
                        width: "12px",
                        height: "12px",
                        backgroundColor: "#ff5f56",
                      }}
                    ></div>
                    <div
                      className="rounded-circle"
                      style={{
                        width: "12px",
                        height: "12px",
                        backgroundColor: "#ffbd2e",
                      }}
                    ></div>
                    <div
                      className="rounded-circle"
                      style={{
                        width: "12px",
                        height: "12px",
                        backgroundColor: "#27c93f",
                      }}
                    ></div>
                  </div>
                  <div
                    className="mx-auto text-muted small font-monospace"
                    style={{ fontSize: "0.8rem" }}
                  >
                    gemini-sql-generator.sh
                  </div>
                </div>

                {/* Nội dung Code */}
                <div
                  className="p-4 font-monospace text-start"
                  style={{ fontSize: "0.85rem", lineHeight: "1.7" }}
                >
                  <div className="text-secondary mb-2"># User Prompt</div>
                  <div className="text-light mb-4 d-flex">
                    <span className="text-success me-2">➜</span>
                    <span>Lấy doanh thu theo từng tháng của năm 2026?</span>
                  </div>

                  <div className="text-secondary mb-2">
                    # Generating optimized SQL...
                  </div>
                  <div className="text-primary fw-bold">SELECT</div>
                  <div className="text-light ms-4">
                    MONTH(created_at) <span className="text-info">AS</span>{" "}
                    month,
                  </div>
                  <div className="text-light ms-4">
                    SUM(total_amount) <span className="text-info">AS</span>{" "}
                    revenue
                  </div>
                  <div className="text-primary fw-bold">
                    FROM <span className="text-light fw-normal">orders</span>
                  </div>
                  <div className="text-primary fw-bold">
                    WHERE{" "}
                    <span className="text-light fw-normal">
                      YEAR(created_at) = 2026
                    </span>
                  </div>
                  <div className="text-primary fw-bold">
                    GROUP BY{" "}
                    <span className="text-light fw-normal">
                      MONTH(created_at)
                    </span>
                  </div>
                  <div className="text-primary fw-bold">
                    ORDER BY{" "}
                    <span className="text-light fw-normal">month ASC;</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= FEATURES SECTION (Tối giản, dùng Vector Icon) ================= */}
        <div className="bg-light border-top py-5">
          <div className="container py-4">
            <div className="row g-4 text-start">
              {/* Box 1 */}
              <div className="col-md-4">
                <div className="p-4 bg-white rounded-4 border shadow-sm h-100">
                  <div className="bg-light d-inline-flex p-3 rounded-3 mb-4 text-dark border">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                      <polyline points="2 17 12 22 22 17"></polyline>
                      <polyline points="2 12 12 17 22 12"></polyline>
                    </svg>
                  </div>
                  <h5 className="fw-bold mb-3 text-dark">Phân tích Context</h5>
                  <p className="text-muted" style={{ fontSize: "0.95rem" }}>
                    Hệ thống ánh xạ trực tiếp các bảng, khóa chính (PK) và khóa
                    ngoại (FK) từ file Schema của bạn vào Context Window để AI
                    hiểu ngữ cảnh dữ liệu.
                  </p>
                </div>
              </div>

              {/* Box 2 */}
              <div className="col-md-4">
                <div className="p-4 bg-white rounded-4 border shadow-sm h-100">
                  <div className="bg-light d-inline-flex p-3 rounded-3 mb-4 text-dark border">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="16 18 22 12 16 6"></polyline>
                      <polyline points="8 6 2 12 8 18"></polyline>
                    </svg>
                  </div>
                  <h5 className="fw-bold mb-3 text-dark">
                    Syntax Highlighting
                  </h5>
                  <p className="text-muted" style={{ fontSize: "0.95rem" }}>
                    Câu lệnh SQL được trả về dưới dạng code block chuẩn mực, dễ
                    dàng copy/paste vào IDE hoặc trình quản trị cơ sở dữ liệu
                    (DBeaver, DataGrip).
                  </p>
                </div>
              </div>

              {/* Box 3 */}
              <div className="col-md-4">
                <div className="p-4 bg-white rounded-4 border shadow-sm h-100">
                  <div className="bg-light d-inline-flex p-3 rounded-3 mb-4 text-dark border">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
                    </svg>
                  </div>
                  <h5 className="fw-bold mb-3 text-dark">
                    Chống Hallucination
                  </h5>
                  <p className="text-muted" style={{ fontSize: "0.95rem" }}>
                    Prompt kỹ thuật (Prompt Engineering) được thiết kế khắt khe
                    để Gemini không tự bịa ra các trường dữ liệu (columns) không
                    tồn tại trong DB của bạn.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
