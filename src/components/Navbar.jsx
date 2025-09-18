import { AppBar, Toolbar, Typography, Button, Stack, Box, Divider } from "@mui/material";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth"; 
import "../styles/Navbar.css";

export default function NavBar() {
  const { pathname } = useLocation();
  const nav = useNavigate();
  const { user, logout } = useAuth();       

  async function onLogout() {
    await logout();
    nav("/");
  }

  return (
    <AppBar position="sticky" elevation={0} color="transparent" className="navbar-appbar">
      <Toolbar className="navbar-toolbar">
        <Box className="brand">
          <Box className="brand-mark" aria-hidden />
          <Typography variant="h6" className="navbar-title">Wedding Planner</Typography>
        </Box>

        <Stack direction="row" spacing={1} className="navbar-links">
          <Button
            component={RouterLink}
            to="/"
            className={`navbar-link ${pathname === "/" ? "is-active" : ""}`}
          >
            Inicio
          </Button>

          <Button
            component={RouterLink}
            to="/eventos"
            className={`navbar-link ${pathname === "/eventos" ? "is-active" : ""}`}
          >
            Eventos
          </Button>

          {user?.rol === "admin" && (
            <Button
              component={RouterLink}
              to="/eventos/nuevo"
              className={`navbar-link ${pathname === "/eventos/nuevo" ? "is-active" : ""}`}
            >
              Nuevo evento
            </Button>
          )}

          {!user ? (
            <Button
              component={RouterLink}
              to="/login"
              className={`navbar-link ${pathname === "/login" ? "is-active" : ""}`}
            >
              Iniciar sesión
            </Button>
          ) : (
            <Button onClick={onLogout} className="navbar-link">
              Salir
            </Button>
          )}

          <Divider orientation="vertical" flexItem className="navbar-div" />

          <Button
            component={RouterLink}
            to="/eventos"
            variant="contained"
            className="navbar-cta"
          >
            Reservar ahora
          </Button>
        </Stack>
      </Toolbar>
      <Divider className="navbar-bottomline" />
    </AppBar>
  );
}
