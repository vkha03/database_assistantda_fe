import "./App.css";

// Toast notification
import { Toaster } from "sonner";

// Import hệ thống định tuyến
import AppRouter from "./routes/AppRouter";

// Context
import { useAuthContext } from "./context/AuthContext";

// Components
import LoadingScreen from "./components/LoadingScreen";

function App() {
  const { loading } = useAuthContext();
  if (loading) return <LoadingScreen />;

  return (
    <>
      {/* 3. Toaster: Sân khấu để các thông báo Sonner hiển thị */}
      <Toaster position="top-right" expand={false} richColors closeButton />

      {/* 4. AppRouter: Bản đồ điều hướng của ứng dụng */}
      <div className="min-vh-100 bg-light text-dark">
        <AppRouter />
      </div>
    </>
  );
}

export default App;
