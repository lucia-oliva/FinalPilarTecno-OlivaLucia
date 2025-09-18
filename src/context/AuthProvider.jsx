import { useState } from "react";
import { AuthContext } from "./AuthContext.jsx";
import { login as apiLogin, logout as apiLogout } from "../mockup/authApiMock.js";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null); 
  const [token, setToken] = useState(null); 

  async function login(email, password) {
    const { user, token } = await apiLogin(email, password);
    setUser(user);
    setToken(token);
    return user;
  }

  async function logout() {
    await apiLogout();
    setUser(null);
    setToken(null);
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
