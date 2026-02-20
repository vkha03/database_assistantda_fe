import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

// // Import Pages (Ông hãy đảm bảo các file này đã tồn tại trong folder pages)
// import ChatPage from "../pages/ChatPage";
import HomePage from "../pages/HomePage";
import DashboardPage from "../pages/DashboardPage";

const AppRouter = () => {
  return (
    <Routes>
      {/* --- CÁC ROUTE CÔNG KHAI (PUBLIC) --- */}
      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
      </Route>
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
};

export default AppRouter;
