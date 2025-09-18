import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export default function LoginPage() {
  const [email, setEmail] = useState("ana@demo.com");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const nav = useNavigate();
  const loc = useLocation();

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      const dest = loc.state?.from?.pathname || "/";
      nav(dest, { replace: true });
    } catch (e) {
      setError(e.message || "Error al iniciar sesión");
    }
  }

  return (
    <div style={{ padding: 16, maxWidth: 420 }}>
      <h2>Iniciar sesión</h2>
      {error && <p style={{ color: "crimson" }}>{error}</p>}
      <form onSubmit={onSubmit} style={{ display: "grid", gap: 8 }}>
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input placeholder="Contraseña" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button type="submit">Entrar</button>
      </form>
      <p style={{ marginTop: 8, fontSize: 12, opacity: .8 }}>
        Admin: ana@demo.com / admin123 — Usuario: juan@demo.com / user123
      </p>
      <p style={{ marginTop: 16 }}><Link to="/">Volver al inicio</Link></p>
    </div>
  );
}
