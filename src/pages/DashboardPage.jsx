import React, { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();

  if (!user) navigate("/");
  // Quản lý yêu cầu tự nhiên của user
  const [prompt, setPrompt] = useState("");

  // Quản lý code SQL (người dùng có thể tự sửa lại sau khi AI gen ra)
  const [sqlCode, setSqlCode] = useState(
    "SELECT \n  id, \n  email, \n  full_name, \n  created_at \nFROM users \nWHERE status = 'active' \nORDER BY created_at DESC \nLIMIT 10;",
  );

  return (
    // Nền màu xám cực nhạt để làm nổi bật các khối chức năng trắng/đen
    <div
      className="container-fluid h-100 p-4 d-flex flex-column"
      style={{ backgroundColor: "#f8fafc" }}
    >
      {/* ================= HEADER CỦA WORKSPACE ================= */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4
            className="fw-bold mb-1 text-dark"
            style={{ letterSpacing: "-0.5px" }}
          >
            Query Workspace
          </h4>
          <div
            className="d-flex align-items-center gap-2 text-muted"
            style={{ fontSize: "0.85rem" }}
          >
            <span>Database:</span>
            {/* Giả lập badge trạng thái kết nối DB */}
            <span className="badge bg-white text-dark border px-2 py-1 shadow-sm d-flex align-items-center gap-2">
              <div
                className="rounded-circle bg-success"
                style={{ width: "8px", height: "8px" }}
              ></div>
              GymConnect_Prod
            </span>
          </div>
        </div>

        {/* Nút công cụ phụ trợ */}
        <div className="d-flex gap-2">
          <button className="btn btn-white border bg-white text-dark btn-sm fw-medium shadow-sm d-flex align-items-center gap-2 px-3 py-2">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            Lịch sử Query
          </button>
        </div>
      </div>

      {/* ================= KHU VỰC CHÍNH (Chia 2 dòng: Code & Data) ================= */}
      <div className="d-flex flex-column flex-grow-1 gap-4 overflow-hidden">
        {/* ----- DÒNG 1: AI PROMPT & SQL EDITOR (Chiếm 45% chiều cao) ----- */}
        <div
          className="card shadow-sm border-0 rounded-4 d-flex flex-column"
          style={{ flex: "0 0 45%" }}
        >
          {/* Thanh nhập Prompt cho AI */}
          <div className="card-header bg-white border-bottom p-3">
            <div className="input-group shadow-sm rounded-3">
              <span className="input-group-text bg-white border-end-0 text-primary px-3">
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
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
              </span>
              <input
                type="text"
                className="form-control border-start-0 ps-0 py-2"
                placeholder="Nhập yêu cầu (VD: Lấy 5 user nạp tiền nhiều nhất tháng này)..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                style={{ fontSize: "0.95rem", boxShadow: "none" }}
              />
              <button className="btn btn-dark fw-bold px-4 d-flex align-items-center gap-2">
                Tạo SQL bằng AI
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </div>
          </div>

          {/* Cửa sổ Code Editor */}
          <div className="card-body p-0 bg-dark d-flex flex-column position-relative overflow-hidden rounded-bottom-4">
            {/* Thanh Toolbar của Editor */}
            <div className="bg-black bg-opacity-25 px-3 py-2 d-flex justify-content-between align-items-center border-bottom border-secondary border-opacity-50">
              <span
                className="text-secondary font-monospace fw-medium"
                style={{ fontSize: "0.75rem", letterSpacing: "1px" }}
              >
                SQL EDITOR
              </span>

              <div className="d-flex gap-2">
                <button
                  className="btn btn-sm btn-outline-secondary text-light border-0 py-1 px-2"
                  style={{ fontSize: "0.75rem" }}
                >
                  Format Code
                </button>
                <button
                  className="btn btn-sm btn-success fw-bold px-3 py-1 shadow-sm d-flex align-items-center gap-2"
                  style={{ fontSize: "0.8rem" }}
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                  Thực thi (Run)
                </button>
              </div>
            </div>

            {/* Vùng gõ Code */}
            <textarea
              className="form-control bg-transparent text-info font-monospace border-0 flex-grow-1 p-3 shadow-none custom-scrollbar"
              value={sqlCode}
              onChange={(e) => setSqlCode(e.target.value)}
              style={{
                resize: "none",
                outline: "none",
                fontSize: "0.95rem",
                lineHeight: "1.6",
              }}
              spellCheck="false"
            ></textarea>
          </div>
        </div>

        {/* ----- DÒNG 2: BẢNG KẾT QUẢ DATA (Chiếm phần không gian còn lại) ----- */}
        <div className="card shadow-sm border-0 rounded-4 d-flex flex-column flex-grow-1 overflow-hidden">
          {/* Toolbar của Bảng Data */}
          <div className="card-header bg-white border-bottom p-3 d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center gap-2">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-secondary"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="3" y1="9" x2="21" y2="9"></line>
                <line x1="9" y1="21" x2="9" y2="9"></line>
              </svg>
              <h6 className="m-0 fw-bold text-dark">Kết quả truy vấn</h6>
            </div>
            <div
              className="text-muted font-monospace"
              style={{ fontSize: "0.8rem" }}
            >
              <span className="me-3">
                Time: <span className="fw-bold text-dark">42ms</span>
              </span>
              <span>
                Rows: <span className="fw-bold text-dark">4</span>
              </span>
            </div>
          </div>

          {/* Vùng cuộn Bảng Data */}
          <div className="card-body p-0 overflow-auto custom-scrollbar bg-white">
            <table
              className="table table-hover table-borderless align-middle m-0"
              style={{ fontSize: "0.85rem" }}
            >
              {/* Tiêu đề cột ghim cố định */}
              <thead
                className="table-light sticky-top border-bottom"
                style={{ zIndex: 1 }}
              >
                <tr>
                  <th
                    scope="col"
                    className="text-muted fw-bold px-4 py-3"
                    style={{ width: "60px" }}
                  >
                    #
                  </th>
                  {/* Chú ý: Hiển thị luôn kiểu dữ liệu kế bên tên cột (Giống DataGrip) */}
                  <th scope="col" className="text-dark fw-bold py-3">
                    id{" "}
                    <span
                      className="text-muted fw-normal ms-1 font-monospace"
                      style={{ fontSize: "0.7rem" }}
                    >
                      int
                    </span>
                  </th>
                  <th scope="col" className="text-dark fw-bold py-3">
                    email{" "}
                    <span
                      className="text-muted fw-normal ms-1 font-monospace"
                      style={{ fontSize: "0.7rem" }}
                    >
                      varchar
                    </span>
                  </th>
                  <th scope="col" className="text-dark fw-bold py-3">
                    full_name{" "}
                    <span
                      className="text-muted fw-normal ms-1 font-monospace"
                      style={{ fontSize: "0.7rem" }}
                    >
                      varchar
                    </span>
                  </th>
                  <th scope="col" className="text-dark fw-bold py-3">
                    created_at{" "}
                    <span
                      className="text-muted fw-normal ms-1 font-monospace"
                      style={{ fontSize: "0.7rem" }}
                    >
                      timestamp
                    </span>
                  </th>
                </tr>
              </thead>

              {/* Dữ liệu giả lập */}
              <tbody className="font-monospace border-top-0">
                <tr className="border-bottom border-light">
                  <td className="text-muted px-4">1</td>
                  <td className="text-primary fw-bold">1001</td>
                  <td>kha.dev@gymconnect.vn</td>
                  <td>Kha Nguyen</td>
                  <td>2026-02-19 08:30:00</td>
                </tr>
                <tr className="border-bottom border-light">
                  <td className="text-muted px-4">2</td>
                  <td className="text-primary fw-bold">1002</td>
                  <td>phong.le@gmail.com</td>
                  <td>Phong Le</td>
                  <td>2026-02-18 14:15:22</td>
                </tr>
                <tr className="border-bottom border-light">
                  <td className="text-muted px-4">3</td>
                  <td className="text-primary fw-bold">1003</td>
                  <td>mai.tran@yahoo.com</td>
                  <td>Mai Tran</td>
                  <td>2026-02-15 09:10:05</td>
                </tr>
                <tr>
                  <td className="text-muted px-4">4</td>
                  <td className="text-primary fw-bold">1004</td>
                  <td>hoang.vu@outlook.com</td>
                  <td>Hoang Vu</td>
                  <td>2026-02-10 18:45:10</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
