import { createContext, useContext, useEffect, useState } from "react";
import * as authService from "../services/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => { authService.getCurrentUser().then(setUser).catch(() => setUser(null)).finally(() => setLoading(false)); }, []);

  async function register(payload) {
    try { const result = await authService.register(payload); setUser(result.user); return result; } catch (error) { return { success: false, message: error.message }; }
  }

  async function login(payload) {
    try { const result = await authService.login(payload); setUser(result.user); return result; } catch (error) { return { success: false, message: error.message }; }
  }

  async function logout() {
    try { await authService.logout(); } finally { setUser(null); }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuthContext() {
  return useContext(AuthContext);
}
