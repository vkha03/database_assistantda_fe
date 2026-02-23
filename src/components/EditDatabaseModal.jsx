import React, { useState } from "react";
import AsyncButton from "./AsyncButton";
import useEditDatabase from "../hooks/useEditDatabase";

const EditDatabaseModal = ({ editingDb, setEditingDb, fetchDatabases }) => {
  const { executeEdit } = useEditDatabase();

  const [formData, setFormData] = useState({
    id: editingDb?.id || "",
    db_name: editingDb?.db_name || "",
    db_host: editingDb?.db_host || "",
    db_port: editingDb?.db_port || "",
    db_password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div
      className={`animate-backdrop modal fade ${editingDb ? "show" : ""}`}
      style={{
        display: editingDb ? "block" : "none",
        backgroundColor: "rgba(15, 23, 42, 0.6)", // Màu nền tối sang hơn (slate-900) thay vì đen thui
        backdropFilter: "blur(4px)", // Hiệu ứng mờ nền chuẩn trend
      }}
      tabIndex="-1"
    >
      <div className="animate-pop-in modal-dialog modal-dialog-centered">
        {/* Nâng cấp Card: Bo góc to, đổ bóng dày, bỏ viền */}
        <div className="modal-content border-0 shadow-lg rounded-4 overflow-hidden">
          {/* ================= HEADER ================= */}
          <div className="modal-header bg-light border-bottom p-4 d-flex align-items-center">
            <div className="d-flex align-items-center gap-3">
              <div
                className="bg-primary bg-opacity-10 text-primary rounded-3 d-flex align-items-center justify-content-center"
                style={{ width: "40px", height: "40px" }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
              </div>
              <div>
                <h5 className="modal-title fw-bold text-dark mb-0">
                  Chỉnh sửa Kết nối
                </h5>
                <p className="text-muted small mb-0 mt-1">
                  Cập nhật thông số máy chủ cơ sở dữ liệu
                </p>
              </div>
            </div>
            <button
              type="button"
              className="btn-close shadow-none"
              onClick={() => setEditingDb(null)}
            ></button>
          </div>

          {/* ================= BODY ================= */}
          <div className="modal-body p-4">
            <div className="mb-4">
              <label
                className="form-label fw-bold text-secondary small text-uppercase"
                style={{ letterSpacing: "0.5px" }}
              >
                Tên Database
              </label>
              <input
                type="text"
                className="form-control p-2.5 bg-light border-light shadow-none"
                name="db_name"
                value={formData.db_name}
                onChange={handleChange}
                placeholder="VD: my_production_db"
              />
            </div>

            <div className="row mb-4">
              <div className="col-md-8">
                <label
                  className="form-label fw-bold text-secondary small text-uppercase"
                  style={{ letterSpacing: "0.5px" }}
                >
                  Host (IP/Domain)
                </label>
                <input
                  type="text"
                  className="form-control p-2.5 bg-light border-light shadow-none text-monospace"
                  name="db_host"
                  value={formData.db_host}
                  onChange={handleChange}
                  placeholder="localhost hoặc 103.x.x.x"
                />
              </div>
              <div className="col-md-4 mt-3 mt-md-0">
                <label
                  className="form-label fw-bold text-secondary small text-uppercase"
                  style={{ letterSpacing: "0.5px" }}
                >
                  Port
                </label>
                <input
                  type="text"
                  className="form-control p-2.5 bg-light border-light shadow-none text-monospace"
                  name="db_port"
                  value={formData.db_port}
                  onChange={handleChange}
                  placeholder="3306"
                />
              </div>
            </div>

            <div className="mb-2">
              <label
                className="form-label fw-bold text-secondary small text-uppercase"
                style={{ letterSpacing: "0.5px" }}
              >
                Mật khẩu (Password)
              </label>
              <input
                type="password"
                className="form-control p-2.5 border-light shadow-none"
                style={{ backgroundColor: "#fffaf0", borderColor: "#ffe4b5" }} // Màu vàng nhạt cảnh báo nhẹ
                name="db_password"
                value={formData.db_password}
                onChange={handleChange}
                placeholder="••••••••"
              />
              <div
                className="form-text mt-2 d-flex align-items-center gap-1 text-warning fw-medium"
                style={{ fontSize: "0.8rem" }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                Bỏ trống ô này nếu bạn không muốn thay đổi mật khẩu cũ.
              </div>
            </div>
          </div>

          {/* ================= FOOTER ================= */}
          <div className="modal-footer bg-light border-top p-3 d-flex justify-content-end gap-2">
            <button
              type="button"
              className="btn btn-white border shadow-sm px-4 fw-medium rounded-3 text-secondary"
              onClick={() => setEditingDb(null)}
            >
              Hủy bỏ
            </button>

            <AsyncButton
              className="btn-dark shadow-sm px-4 fw-bold rounded-3 d-flex align-items-center gap-2"
              onClick={() =>
                executeEdit({
                  editData: formData,
                  setEditingDb,
                  fetchDatabases,
                })
              }
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              Lưu thay đổi
            </AsyncButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditDatabaseModal;
