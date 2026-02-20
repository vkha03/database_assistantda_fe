import React from "react";

const LoadingScreen = () => {
  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 bg-white d-flex flex-column justify-content-center align-items-center"
      style={{ zIndex: 9999 }}
    >
      {/* Khối Logo */}
      <div className="d-flex align-items-center mb-4">
        <div
          className="bg-dark text-white rounded d-flex align-items-center justify-content-center fw-bold me-2 shadow-sm"
          style={{ width: "48px", height: "48px", fontSize: "1.25rem" }}
        >
          DB
        </div>
        <span
          className="fs-4 fw-bold text-dark lh-1"
          style={{ letterSpacing: "-0.5px" }}
        >
          Assistant <span className="text-muted fw-normal">Pro</span>
        </span>
      </div>

      {/* Vòng xoay Loading tối giản */}
      <div
        className="spinner-border text-dark opacity-50"
        style={{ width: "1.5rem", height: "1.5rem", borderWidth: "0.15em" }}
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingScreen;
