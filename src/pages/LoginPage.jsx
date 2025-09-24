import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  InputAdornment,
  Divider,
} from "@mui/material";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import "../styles/LoginPage.css";

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
    <Box className="auth-grid">
      <Box className="brand-pane">
        <Box className="brand-badge" aria-hidden />
        <Typography variant="h4" className="brand-title">Wedding Planner</Typography>
        <Typography variant="body1" className="brand-copy">
          Planeá, organizá y seguí cada evento desde un único panel.
        </Typography>

        <ul className="brand-list">
          <li>Dashboard de eventos</li>
          <li>Calendario</li>
          <li>Reserva a Eventos</li>
        </ul>
      </Box>

      <Paper elevation={0} className="auth-card">
        <header className="auth-header">
          <Box className="auth-logo" aria-hidden />
          <Box>
            <Typography variant="h5" className="auth-title">Accedé a tu cuenta</Typography>
            <Typography variant="body2" className="auth-sub">
              Gestioná eventos, proveedores y reservas desde un solo lugar.
            </Typography>
          </Box>
        </header>

        {error && <Alert severity="error" className="auth-alert">{error}</Alert>}

        <Box component="form" onSubmit={onSubmit} noValidate className="auth-form">
          <TextField
            fullWidth
            label="Email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Box className="adorn" ><EmailRoundedIcon fontSize="small" /></Box>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            label="Contraseña"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Box className="adorn"><LockRoundedIcon fontSize="small" /></Box>
                </InputAdornment>
              ),
            }}
          />

          <Button type="submit" variant="contained" className="auth-btn">
            Iniciar sesión
          </Button>
        </Box>

        <Divider className="auth-div" />

        <Box className="demo-info">
          <Typography variant="caption" className="muted">
            Admin: <strong>ana@demo.com</strong> / <strong>admin123</strong>
          </Typography>
          <Typography variant="caption" className="muted">
            Usuario: <strong>juan@demo.com</strong> / <strong>user123</strong>
          </Typography>
        </Box>

        <Box className="back-home">
          <Link to="/" className="link-back">Volver al inicio</Link>
        </Box>
      </Paper>
    </Box>
  );
}
