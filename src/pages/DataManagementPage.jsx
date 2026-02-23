import { useState } from "react";
import AddConnectionModal from "../components/AddConnectionModal";
import useDisplayDatabase from "../hooks/useDisplayDatabase";
import DeleteDatabaseModal from "../components/DeleteDatabaseModal";
import EditDatabaseModal from "../components/EditDatabaseModal";
import useActiveDatabase from "../hooks/useActiveDatabase";
import useTestConnection from "../hooks/useTestConnection";
import useGetSchema from "../hooks/useGetSchema";
import AsyncButton from "../components/AsyncButton";
import formatSchemaData from "../utils/formatSchema";

const DatabaseConnectionPage = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const { databases, isLoading, fetchDatabases } = useDisplayDatabase();
  const [deletingId, setDeletingId] = useState(null);
  const [editingDb, setEditingDb] = useState(null); // Lưu nguyên cục Object, không phải mỗi ID
  const { executeActive } = useActiveDatabase();
  const { executeTest } = useTestConnection();
  const { fetchSchema } = useGetSchema();

  // State để chứa data đã được gọt rửa
  const [activeSchemaData, setActiveSchemaData] = useState([]);
  const [showSchema, setShowSchema] = useState(false);
  const [selectedDbName, setSelectedDbName] = useState("");

  // const mockSchemaData = [
  //   {
  //     tableName: "users",
  //     columns: [
  //       { name: "id", type: "int(11)", isPk: true },
  //       { name: "email", type: "varchar(255)", isPk: false },
  //       { name: "password", type: "varchar(255)", isPk: false },
  //       { name: "created_at", type: "timestamp", isPk: false },
  //     ],
  //   },
  //   {
  //     tableName: "subscriptions",
  //     columns: [
  //       { name: "id", type: "int(11)", isPk: true },
  //       { name: "user_id", type: "int(11)", isPk: false, isFk: true },
  //       { name: "plan_name", type: "varchar(100)", isPk: false },
  //       { name: "expires_at", type: "date", isPk: false },
  //     ],
  //   },
  // ];

  const handleViewSchema = (db) => {
    setSelectedDbName(db.db_name); // Set cái tên hiển thị trên header

    // Nhét thuộc tính schema của ông vào máy xay (tùy Backend ông đặt key là gì, tôi ví dụ là schema_json)
    const formattedData = formatSchemaData(db.schema_json);

    setActiveSchemaData(formattedData); // Cập nhật State
    setShowSchema(true); // Vuốt Offcanvas bay ra!
  };

  return (
    <>
      {openAddModal && (
        <AddConnectionModal
          fetchDatabases={fetchDatabases}
          onClose={() => setOpenAddModal(false)}
        />
      )}

      {deletingId && (
        <DeleteDatabaseModal
          deletingId={deletingId}
          setDeletingId={setDeletingId}
          fetchDatabases={fetchDatabases}
        />
      )}

      {editingDb && (
        <EditDatabaseModal
          editingDb={editingDb}
          setEditingDb={setEditingDb}
          fetchDatabases={fetchDatabases}
        />
      )}

      <div
        className="container-fluid h-100 p-4 d-flex flex-column position-relative"
        style={{ backgroundColor: "#f8fafc", overflowY: "auto" }}
      >
        {/* ================= HEADER ================= */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h4
              className="fw-bold mb-1 text-dark"
              style={{ letterSpacing: "-0.5px" }}
            >
              Quản lý Kết nối Database
            </h4>
            <p className="text-muted mb-0" style={{ fontSize: "0.85rem" }}>
              Thêm, cấu hình và chọn Database mà Trợ lý AI sẽ sử dụng để truy
              vấn.
            </p>
          </div>

          <button
            onClick={() => {
              setOpenAddModal(true);
            }}
            className="btn btn-dark fw-bold px-4 shadow-sm d-flex align-items-center gap-2"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Thêm kết nối mới
          </button>
        </div>

        {/* ================= DANH SÁCH DATABASE ================= */}
        <div className="row g-4">
          {databases.map((db) => (
            <div className="col-12" key={db.id}>
              <div
                className={`card shadow-sm rounded-4 border ${db.isActive ? "border-success bg-success bg-opacity-10" : "border-light bg-white"}`}
              >
                <div className="card-body p-4 d-flex justify-content-between align-items-center">
                  {/* Info */}
                  <div className="d-flex align-items-center gap-4">
                    <div
                      className={`rounded-4 d-flex align-items-center justify-content-center ${db.isActive ? "bg-white shadow-sm" : "bg-light"}`}
                      style={{ width: "60px", height: "60px" }}
                    >
                      <svg
                        width="28"
                        height="28"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={db.isActive ? "#198754" : "#6c757d"}
                        strokeWidth="2"
                      >
                        <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
                        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
                        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
                      </svg>
                    </div>

                    <div>
                      <div className="d-flex align-items-center gap-3 mb-1">
                        <h5 className="fw-bold m-0 text-dark">{db.db_name}</h5>
                        {db.isActive ? (
                          <span className="badge bg-success text-white px-2 py-1 shadow-sm d-flex align-items-center gap-1">
                            <span
                              className="rounded-circle bg-white"
                              style={{ width: "6px", height: "6px" }}
                            ></span>{" "}
                            Đang sử dụng
                          </span>
                        ) : (
                          <span className="badge bg-secondary bg-opacity-25 text-dark px-2 py-1 border">
                            Ngừng hoạt động
                          </span>
                        )}
                      </div>
                      <div
                        className="text-muted font-monospace d-flex align-items-center gap-3"
                        style={{ fontSize: "0.85rem" }}
                      >
                        <span>{"MySQL"}</span> •{" "}
                        <span>
                          {db.db_host}:{db.db_port}
                        </span>{" "}
                        •{" "}
                        <span>
                          DB:{" "}
                          <span className="text-dark fw-bold">
                            {db.db_name}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Nút thao tác */}

                  <div className="d-flex align-items-center gap-3">
                    {!!db.is_active && (
                      <div className="d-flex align-items-center gap-2 border-end pe-4 me-2">
                        <AsyncButton
                          onClick={() => executeTest(db.id)}
                          className="btn-sm btn-outline-primary fw-medium d-flex align-items-center gap-2 border-0"
                        >
                          {/* Nhét cái ruột (children) vào đây! */}
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                          </svg>
                          Kiểm tra kết nối
                        </AsyncButton>

                        <AsyncButton
                          onClick={() => fetchSchema(fetchDatabases)}
                          className="btn btn-sm btn-outline-primary fw-medium d-flex align-items-center gap-1 border-0"
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <polyline points="23 4 23 10 17 10"></polyline>
                            <polyline points="1 20 1 14 7 14"></polyline>
                            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
                          </svg>
                          Lấy cấu trúc
                        </AsyncButton>

                        <button
                          className="btn btn-sm btn-light fw-medium d-flex align-items-center gap-1 border shadow-sm"
                          onClick={() => handleViewSchema(db)}
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                          </svg>
                          Cấu trúc{" "}
                          <span
                            className="text-muted fw-normal"
                            style={{ fontSize: "0.7rem" }}
                          ></span>
                        </button>
                      </div>
                    )}

                    {/* TRẢ LẠI MENU SỬA/XÓA Ở ĐÂY */}
                    <div className="d-flex align-items-center gap-2">
                      {!db.is_active ? (
                        <AsyncButton
                          onClick={() => executeActive(db.id, fetchDatabases)}
                          className="btn btn-success fw-bold px-4 shadow-sm"
                        >
                          Kích hoạt
                        </AsyncButton>
                      ) : (
                        <AsyncButton
                          onClick={() => executeActive(db.id, fetchDatabases)}
                          className="btn btn-secondary fw-bold px-4 shadow-sm"
                          disable="true"
                        >
                          Đang kích hoạt
                        </AsyncButton>
                      )}

                      <div className="dropdown">
                        <button
                          className="btn btn-light border btn-sm p-2 rounded-3"
                          type="button"
                          data-bs-toggle="dropdown"
                        >
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <circle cx="12" cy="12" r="1"></circle>
                            <circle cx="12" cy="5" r="1"></circle>
                            <circle cx="12" cy="19" r="1"></circle>
                          </svg>
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end shadow-sm border-0 mt-2 rounded-3">
                          <li>
                            <button
                              onClick={() => setEditingDb(db)}
                              className="dropdown-item d-flex align-items-center gap-2 py-2"
                            >
                              <svg
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                              >
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                              </svg>{" "}
                              Sửa kết nối
                            </button>
                          </li>
                          <li>
                            <hr className="dropdown-divider" />
                          </li>
                          <li>
                            <button
                              onClick={() => {
                                setDeletingId(db.id);
                              }}
                              className="dropdown-item text-danger d-flex align-items-center gap-2 py-2"
                            >
                              <svg
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                              >
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                              </svg>{" "}
                              Xóa Database
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ================= OFFCANVAS MÀN HÌNH SCHEMA ĐƯỢC LÀM LẠI ================= */}
        {showSchema && (
          <div
            className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
            style={{ zIndex: 1040 }}
            onClick={() => setShowSchema(false)}
          ></div>
        )}

        {/* Nới rộng Offcanvas ra 550px để hiển thị Table cho đẹp */}
        <div
          className={`position-fixed top-0 end-0 h-100 bg-light shadow-lg transition-transform ${showSchema ? "translate-middle-x-0" : "translate-end-100"}`}
          style={{
            width: "550px",
            zIndex: 1050,
            transition: "transform 0.3s ease-in-out",
            transform: showSchema ? "translateX(0)" : "translateX(100%)",
          }}
        >
          <div
            className="bg-white d-flex justify-content-between align-items-center p-4 border-bottom shadow-sm"
            style={{ zIndex: 1, position: "relative" }}
          >
            <div>
              <h5 className="fw-bold mb-1">Cấu trúc Database</h5>
              <div
                className="text-primary font-monospace fw-medium d-flex align-items-center gap-2"
                style={{ fontSize: "0.85rem" }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
                  <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
                  <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
                </svg>
                {selectedDbName}
              </div>
            </div>
            <button
              className="btn btn-light rounded-circle p-2"
              onClick={() => setShowSchema(false)}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          {/* Khu vực cuộn chứa các Card Table */}
          <div className="p-4 overflow-auto custom-scrollbar h-100 pb-5">
            {activeSchemaData.map((table, idx) => (
              <div
                className="card border-0 shadow-sm rounded-4 overflow-hidden mb-4"
                key={idx}
              >
                {/* Header của từng bảng */}
                <div className="card-header bg-white border-bottom p-3 d-flex align-items-center gap-2">
                  <svg
                    width="18"
                    height="18"
                    className="text-secondary"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect
                      x="3"
                      y="3"
                      width="18"
                      height="18"
                      rx="2"
                      ry="2"
                    ></rect>
                    <line x1="3" y1="9" x2="21" y2="9"></line>
                    <line x1="9" y1="21" x2="9" y2="9"></line>
                  </svg>
                  <h6 className="m-0 fw-bold text-dark">{table.tableName}</h6>
                </div>

                {/* Table hiển thị cột */}
                <div className="card-body p-0">
                  <table
                    className="table table-hover m-0 align-middle table-borderless"
                    style={{ fontSize: "0.85rem" }}
                  >
                    <thead className="table-light border-bottom">
                      <tr>
                        <th className="px-4 py-2 text-muted fw-bold">
                          Tên cột
                        </th>
                        <th className="py-2 text-muted fw-bold">
                          Kiểu dữ liệu
                        </th>
                        <th className="py-2 text-muted fw-bold text-end pe-4">
                          Khóa
                        </th>
                      </tr>
                    </thead>
                    <tbody className="font-monospace">
                      {table.columns.map((col, cIdx) => (
                        <tr key={cIdx} className="border-bottom border-light">
                          <td className="px-4 fw-bold text-dark">{col.name}</td>
                          <td className="text-primary">{col.type}</td>
                          <td className="text-end pe-4">
                            {col.isPk && (
                              <span className="badge bg-warning text-dark">
                                <svg
                                  width="10"
                                  height="10"
                                  className="me-1"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                >
                                  <path d="M21 2l-5 5v5l-5 5-5-5L2 16l4 4 6-6h5l5-5z" />
                                </svg>
                                PK
                              </span>
                            )}
                            {!col.isPk && col.isFk && (
                              <span className="badge bg-info text-dark">
                                FK
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default DatabaseConnectionPage;
