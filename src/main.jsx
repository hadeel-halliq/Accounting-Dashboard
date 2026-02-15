import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
// import App from './App.jsx'
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import { PermissionProvider } from "./context/PermissionContext";
import AppRoutes from "./routes/AppRoutes";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <PermissionProvider>
        <Router>
          <AppRoutes />
          <Toaster position="top-center" />
        </Router>
      </PermissionProvider>
    </AuthProvider>
  </StrictMode>,
);
