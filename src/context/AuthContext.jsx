import { createContext, useState, useEffect, useContext } from "react";
import {
  login as loginRequest,
  logout as logoutRequest,
  getMe,
} from "@/services/auth-service";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check auth on app load (cookie-based)
  useEffect(() => {
    async function checkAuth() {
      try {
        const me = await getMe();

        const normalizedUser = {
          ...me,
          role: me.role?.toUpperCase(),
          branchId: me.branch_id ?? me.branchId ?? null,
        };

        setUser(normalizedUser);
      } catch (err) {
        // cookie invalid / expired
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
  }, []);

  // Login
  async function login(credentials) {
    await loginRequest(credentials); // sets HttpOnly cookie

    const me = await getMe();

    const normalizedUser = {
      ...me,
      role: me.role?.toUpperCase(),
      branchId: me.branch_id ?? me.branchId ?? null,
    };

    setUser(normalizedUser);
    return normalizedUser;
  }

  // Logout
  async function logout() {
    try {
      await logoutRequest();
    } finally {
      setUser(null);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role ?? null,
        branchId: user?.branchId ?? null,
        isAuthenticated: Boolean(user),
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
