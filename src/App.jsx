import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { PermissionProvider } from "./context/PermissionContext";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PermissionProvider>
          <AppRoutes />
        </PermissionProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
