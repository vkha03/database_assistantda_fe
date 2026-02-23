import useAddConnection from "../hooks/useAddConnection";
import AsyncButton from "./AsyncButton";

const AddConnectionModal = ({ fetchDatabases, onClose }) => {
  const {
    handleInputChange,
    handleSave,
    showPassword,
    formData,
    togglePassword,
  } = useAddConnection();
  // 3. RENDER UI
  return (
    <div
      className="animate-backdrop position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
      style={{ zIndex: 1050 }}
    >
      {/* Backdrop (Bấm ra ngoài viền mờ để đóng) */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
        onClick={onClose}
      ></div>

      {/* Box Modal */}
      <div
        className="animate-pop-in card border-0 shadow-lg rounded-4 position-relative"
        style={{ width: "600px", zIndex: 1060 }}
      >
        {/* Header */}
        <div className="card-header bg-white border-bottom p-4 d-flex justify-content-between align-items-center rounded-top-4">
          <h5 className="fw-bold m-0 d-flex align-items-center gap-2">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-primary"
            >
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
              <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
              <line x1="12" y1="22.08" x2="12" y2="12"></line>
            </svg>
            Thêm Kết Nối Mới
          </h5>
          <button className="btn-close shadow-none" onClick={onClose}></button>
        </div>

        {/* Body (Form) */}
        <div className="card-body p-4">
          <div className="row g-3">
            {/* Loại DB (Đã xóa tên kết nối và cho Loại DB disable) */}
            <div className="col-12">
              <label
                className="form-label text-muted fw-bold"
                style={{ fontSize: "0.8rem" }}
              >
                LOẠI DB
              </label>
              <select
                name="type"
                className="form-select bg-light border-0 fw-bold"
                value={formData.type}
                disabled // <--- Đã thêm disable để chặn user click
              >
                <option value="MySQL">MySQL</option>
              </select>
            </div>

            {/* Host & Port */}
            <div className="col-md-9">
              <label
                className="form-label text-muted fw-bold mt-2"
                style={{ fontSize: "0.8rem" }}
              >
                HOST / IP ADDRESS
              </label>
              <input
                type="text"
                name="db_host"
                className="form-control bg-light border-0 font-monospace"
                placeholder="localhost hoặc 103.x.x.x"
                value={formData.host}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-md-3">
              <label
                className="form-label text-muted fw-bold mt-2"
                style={{ fontSize: "0.8rem" }}
              >
                PORT
              </label>
              <input
                type="number"
                name="db_port"
                className="form-control bg-light border-0 font-monospace"
                value={formData.port}
                onChange={handleInputChange}
              />
            </div>

            {/* Username & Password */}
            <div className="col-md-6">
              <label
                className="form-label text-muted fw-bold mt-2"
                style={{ fontSize: "0.8rem" }}
              >
                USERNAME
              </label>
              <input
                type="text"
                name="db_user"
                className="form-control bg-light border-0 font-monospace"
                placeholder="root"
                value={formData.username}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-md-6">
              <label
                className="form-label text-muted fw-bold mt-2"
                style={{ fontSize: "0.8rem" }}
              >
                PASSWORD
              </label>
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  name="db_password"
                  className="form-control bg-light border-0 font-monospace"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <button
                  className="btn btn-light bg-light border-0"
                  type="button"
                  onClick={togglePassword}
                >
                  {showPassword ? (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                      <line x1="1" y1="1" x2="23" y2="23"></line>
                    </svg>
                  ) : (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* DB Name */}
            <div className="col-12">
              <label
                className="form-label text-muted fw-bold mt-2"
                style={{ fontSize: "0.8rem" }}
              >
                DATABASE NAME
              </label>
              <input
                type="text"
                name="db_name"
                className="form-control bg-light border-0 font-monospace"
                placeholder="Tên cơ sở dữ liệu (VD: gym_db)"
                value={formData.database}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        {/* Footer (Đã dọn dẹp, đẩy 2 nút qua phải) */}
        <div className="card-footer bg-white border-top p-4 d-flex justify-content-end align-items-center rounded-bottom-4 gap-2">
          <button className="btn btn-light fw-medium px-4" onClick={onClose}>
            Hủy
          </button>
          <AsyncButton
            className="btn btn-dark fw-bold px-4 shadow-sm"
            onClick={() => {
              handleSave(fetchDatabases, onClose);
            }}
          >
            Lưu Kết Nối
          </AsyncButton>
        </div>
      </div>
    </div>
  );
};

export default AddConnectionModal;
