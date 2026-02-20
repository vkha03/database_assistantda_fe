import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const MainLayout = () => {
  return (
    // Xếp ngang: vh-100 để không bao giờ bị cuộn cả trang
    <div className="d-flex vh-100 overflow-hidden bg-light">
      {/* Cột trái: Thanh điều hướng cố định */}
      <Sidebar />

      {/* Cột phải: Phần nội dung chính (Trang chủ hoặc Dashboard) */}
      {/* flex-grow-1 để nó bành trướng ra chiếm hết chỗ trống, overflow-auto để nó tự cuộn nội dung bên trong */}
      <main className="flex-grow-1 overflow-auto relative">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
