import "./App.css";

// Import hệ thống định tuyến
import AppRouter from "./routes/AppRouter";

// Context
import { useAuthContext } from "./context/AuthContext";

// Components
import LoadingScreen from "./components/LoadingScreen";

function App() {
  const { loadingAuth } = useAuthContext();
  if (loadingAuth) return <LoadingScreen />;

  return (
    <>
      {/* 4. AppRouter: Bản đồ điều hướng của ứng dụng */}
      <div className="min-vh-100 bg-light text-dark">
        <AppRouter />
      </div>
    </>
  );
}

export default App;
