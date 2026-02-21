import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const Sidebar = () => {
  // Chỉ cần lấy user và hàm logout, không cần quan tâm đến login nữa
  const { user, logout } = useAuthContext();
  const location = useLocation();

  const getNavItemClass = (path) => {
    const isActive = location.pathname === path;
    return `nav-link d-flex align-items-center gap-2 py-2 px-3 mb-1 rounded ${
      isActive
        ? "bg-light text-dark fw-bold"
        : "text-secondary text-decoration-none"
    }`;
  };

  return (
    <>
      <div
        className="d-flex flex-column flex-shrink-0 bg-white border-end vh-100"
        style={{ width: "260px" }}
      >
        {/* ===== LOGO & BRAND ===== */}
        <div className="p-3 border-bottom">
          <Link
            to="/"
            className="d-flex align-items-center text-dark text-decoration-none"
          >
            <div
              className="bg-dark text-white rounded d-flex align-items-center justify-content-center fw-bold me-2"
              style={{ width: "32px", height: "32px" }}
            >
              DB
            </div>
            <span className="fs-6 fw-bold letter-spacing-tight">
              Assistant <span className="text-muted fw-normal">Pro</span>
            </span>
          </Link>
        </div>

        <div className="p-3 flex-grow-1 overflow-auto custom-scrollbar">
          {/* Nút Call-to-Action */}
          <button className="btn btn-dark w-100 d-flex align-items-center justify-content-center gap-2 mb-4 py-2 shadow-sm text-sm fw-medium">
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
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Phiên làm việc mới
          </button>

          {/* ===== MAIN MENU ===== */}
          <div
            className="text-uppercase text-muted fw-bold mb-2 px-3"
            style={{ fontSize: "0.7rem", letterSpacing: "0.5px" }}
          >
            Tổng quan
          </div>
          <ul className="nav flex-column mb-4">
            <li className="nav-item">
              <Link to="/" className={getNavItemClass("/")}>
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
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
                Trang chủ
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/workspace" className={getNavItemClass("/workspace")}>
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
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                  <line x1="8" y1="21" x2="16" y2="21"></line>
                  <line x1="12" y1="17" x2="12" y2="21"></line>
                </svg>
                Không gian làm việc
              </Link>
            </li>
          </ul>

          {/* ===== DATABASE MANAGEMENT ===== */}
          <div
            className="text-uppercase text-muted fw-bold mb-2 px-3"
            style={{ fontSize: "0.7rem", letterSpacing: "0.5px" }}
          >
            Dữ liệu (Schema)
          </div>
          <ul className="nav flex-column mb-4">
            <li className="nav-item">
              <Link
                to="/database-management"
                className={getNavItemClass("/database-management")}
                style={{ cursor: "pointer" }}
              >
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
                  <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
                  <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
                  <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
                </svg>
                Quản lý Database
              </Link>
            </li>
            <li className="nav-item">
              <a
                href="#"
                className="nav-link text-secondary d-flex align-items-center gap-2 py-2 px-3 mb-1 rounded"
                style={{ cursor: "pointer" }}
              >
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
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="17 8 12 3 7 8"></polyline>
                  <line x1="12" y1="3" x2="12" y2="15"></line>
                </svg>
                Tải lên File .SQL
              </a>
            </li>
          </ul>

          {/* ===== SETTINGS & HISTORY ===== */}
          <div
            className="text-uppercase text-muted fw-bold mb-2 px-3"
            style={{ fontSize: "0.7rem", letterSpacing: "0.5px" }}
          >
            Hệ thống
          </div>
          <ul className="nav flex-column mb-4">
            <li className="nav-item">
              <a
                href="#"
                className="nav-link text-secondary d-flex align-items-center gap-2 py-2 px-3 mb-1 rounded"
                style={{ cursor: "pointer" }}
              >
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
                  <circle cx="12" cy="12" r="3"></circle>
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                </svg>
                Cấu hình API Key
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#"
                className="nav-link text-secondary d-flex align-items-center gap-2 py-2 px-3 mb-1 rounded"
                style={{ cursor: "pointer" }}
              >
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
                  <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Lịch sử Chat
              </a>
            </li>
          </ul>
        </div>

        {/* ===== USER / AUTH SECTION Ở ĐÁY (LUÔN LUÔN HIỂN THỊ TRẠNG THÁI LOGGED IN) ===== */}
        <div className="p-3 border-top bg-light bg-opacity-50">
          <div className="dropdown">
            <button
              className="btn btn-light w-100 d-flex align-items-center justify-content-between p-2 border-0 shadow-sm rounded"
              type="button"
              data-bs-toggle="dropdown"
            >
              <div className="d-flex align-items-center gap-2 overflow-hidden">
                <img
                  src={
                    user?.picture ||
                    `https://ui-avatars.com/api/?name=${user?.name || "U"}&background=random`
                  }
                  alt="Avatar"
                  width="32"
                  height="32"
                  className="rounded-circle"
                />
                <div className="text-start text-truncate">
                  <div
                    className="fw-bold text-dark"
                    style={{ fontSize: "0.85rem" }}
                  >
                    {user?.name || "Developer"}
                  </div>
                  <div className="text-muted" style={{ fontSize: "0.75rem" }}>
                    {user?.email || "Hội viên Pro"}
                  </div>
                </div>
              </div>
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
                <polyline points="7 10 12 15 17 10"></polyline>
              </svg>
            </button>
            <ul
              className="dropdown-menu dropdown-menu-end shadow-sm border-0 w-100 mt-1"
              style={{ fontSize: "0.9rem" }}
            >
              <li>
                <a className="dropdown-item py-2" href="#">
                  Hồ sơ cá nhân
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <button
                  className="dropdown-item text-danger fw-medium py-2 d-flex align-items-center gap-2"
                  onClick={logout}
                >
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
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    <polyline points="16 17 21 12 16 7"></polyline>
                    <line x1="21" y1="12" x2="9" y2="12"></line>
                  </svg>
                  Đăng xuất
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
