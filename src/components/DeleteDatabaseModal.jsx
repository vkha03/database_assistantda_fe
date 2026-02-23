import AsyncButton from "./AsyncButton";
import useDeleteDatabase from "../hooks/useDeleteDatabase";

const DeleteDatabaseModal = ({ deletingId, setDeletingId, fetchDatabases }) => {
  const { executeDelete } = useDeleteDatabase();

  return (
    <div
      className={`animate-backdrop modal fade ${deletingId ? "show" : ""}`}
      style={{
        display: deletingId ? "block" : "none",
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
      tabIndex="-1"
    >
      <div className="animate-pop-in modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title text-danger">
              <i className="bi bi-exclamation-triangle-fill me-2"></i>Cảnh báo
              nguy hiểm
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => setDeletingId(null)} // Bấm X thì set về null -> Tự đóng
            ></button>
          </div>
          <div className="modal-body">
            <p>Ông có chắc chắn muốn xóa Database này không?</p>
            <p className="text-muted small">
              Hành động này là một đi không trở lại, dữ liệu sẽ bốc hơi vĩnh
              viễn.
            </p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setDeletingId(null)}
            >
              Hủy, tôi nhát tay
            </button>

            <AsyncButton
              className="btn-danger"
              onClick={() =>
                executeDelete(deletingId, setDeletingId, fetchDatabases)
              }
            >
              Xóa sổ nó!
            </AsyncButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteDatabaseModal;
