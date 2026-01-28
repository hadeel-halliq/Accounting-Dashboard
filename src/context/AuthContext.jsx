import { createContext, useState, useEffect, useContext } from "react";
import { login as loginRequest } from "@/services/auth-service";

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
    const data = await loginRequest(credentials);
    setUser(data);
    localStorage.setItem("auth", JSON.stringify(data));
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

// api جاهز للتعامل مع 
