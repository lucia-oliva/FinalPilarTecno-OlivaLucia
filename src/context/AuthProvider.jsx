import { useEffect, useMemo, useState } from "react";
import { AuthContext } from "./authContext.jsx"; 
import { login as apiLogin, logout as apiLogout } from "../mockup/authApiMock.js";

const LS_KEY = "auth"; 

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) {
        const { user: u, token: t } = JSON.parse(raw);
        if (u && t) {
          setUser(u);
          setToken(t);
        }
      }
    } catch {
      localStorage.removeItem(LS_KEY);
    }
  }, []);


  useEffect(() => {
    if (user && token) {
      localStorage.setItem(LS_KEY, JSON.stringify({ user, token }));
    } else {
      localStorage.removeItem(LS_KEY);
    }
  }, [user, token]);

  async function login(email, password) {
    const { user: u, token: t } = await apiLogin(email, password);
    setUser(u);
    setToken(t);
    return u;
  }

  async function logout() {
    try {
      await apiLogout();
    } finally {
      setUser(null);
      setToken(null);
      localStorage.removeItem(LS_KEY);
    }
  }

  const isAuthenticated = !!user && !!token;

  const value = useMemo(
    () => ({ user, token, isAuthenticated, login, logout, setUser }),
    [user, token]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
