import { createContext, useState, useEffect, useContext } from "react";
import { login as loginRequest } from "@/services/auth-service";
import { roles } from "@/constants/roles";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedAuth = localStorage.getItem("auth");
    if (savedAuth) {
      setUser(JSON.parse(savedAuth));
    }
    setLoading(false);
  }, []);

  async function login(credentials) {
    try {
      const data = await loginRequest(credentials);

      const normalizedUser = {
        ...data,
        role: data.role?.toUpperCase(),
        branch_id: data.branch_id || data.branchId || null,
      };

      setUser(normalizedUser);
      localStorage.setItem("auth", JSON.stringify(normalizedUser));
      return normalizedUser; 
    } catch (err) {
      console.error("Login failed:", err);
      throw err;
    }
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("auth");
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user && user.role,
        branchId: user && user.branch_id,
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
  return useContext(AuthContext);
}
