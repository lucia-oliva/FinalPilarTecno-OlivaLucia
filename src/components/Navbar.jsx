import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Stack,
  Box,
  Divider,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
} from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import "../styles/Navbar.css";

export default function NavBar() {
  const { pathname } = useLocation();
  const nav = useNavigate();
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const isLogged = !!user;

  async function onLogout() {
    await logout();
    setOpen(false);
    nav("/");
  }

  const closeAndNav = () => setOpen(false);

  return (
    <AppBar position="sticky" elevation={0} color="transparent" className="navbar-appbar">
      <Toolbar className="navbar-toolbar">
        <Box className="brand">
          <Box className="brand-mark" aria-hidden />
          <Typography variant="h6" className="navbar-title">Wedding Planner</Typography>
        </Box>

        <Stack direction="row" className="navbar-links">
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

          {isLogged && (
            <Button
              component={RouterLink}
              to="/mis-reservas"
              className={`navbar-link ${pathname === "/mis-reservas" ? "is-active" : ""}`}
            >
              Mis reservas
            </Button>
          )}

          {user?.rol === "admin" && (
            <Button
              component={RouterLink}
              to="/eventos/nuevo"
              className={`navbar-link ${pathname === "/eventos/nuevo" ? "is-active" : ""}`}
            >
              Nuevo evento
            </Button>
          )}

          {!isLogged ? (
            <Button
              component={RouterLink}
              to="/login"
              className={`navbar-link ${pathname === "/login" ? "is-active" : ""}`}
            >
              Iniciar sesión
            </Button>
          ) : (
            <Button onClick={onLogout} className="navbar-link">Salir</Button>
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

        <IconButton
          className="hamburger-btn"
          aria-label="Abrir menú"
          onClick={() => setOpen(true)}
        >
          <MenuRoundedIcon />
        </IconButton>
      </Toolbar>

      <Divider className="navbar-bottomline" />

      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{ className: "navbar-drawer" }}
      >
        <Box className="drawer-head">
          <Box className="brand small">
            <Box className="brand-mark" aria-hidden />
            <Typography className="navbar-title">Wedding Planner</Typography>
          </Box>
          <IconButton aria-label="Cerrar menú" onClick={() => setOpen(false)} className="drawer-close">
            <CloseRoundedIcon />
          </IconButton>
        </Box>

        <Divider className="drawer-divider" />

        <List className="drawer-list">
          <ListItem disablePadding>
            <ListItemButton
              component={RouterLink}
              to="/"
              onClick={closeAndNav}
              className={`drawer-link ${pathname === "/" ? "is-active" : ""}`}
            >
              Inicio
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              component={RouterLink}
              to="/eventos"
              onClick={closeAndNav}
              className={`drawer-link ${pathname === "/eventos" ? "is-active" : ""}`}
            >
              Eventos
            </ListItemButton>
          </ListItem>

          {isLogged && (
            <ListItem disablePadding>
              <ListItemButton
                component={RouterLink}
                to="/mis-reservas"
                onClick={closeAndNav}
                className={`drawer-link ${pathname === "/mis-reservas" ? "is-active" : ""}`}
              >
                Mis reservas
              </ListItemButton>
            </ListItem>
          )}

          {user?.rol === "admin" && (
            <ListItem disablePadding>
              <ListItemButton
                component={RouterLink}
                to="/eventos/nuevo"
                onClick={closeAndNav}
                className={`drawer-link ${pathname === "/eventos/nuevo" ? "is-active" : ""}`}
              >
                Nuevo evento
              </ListItemButton>
            </ListItem>
          )}

          {!isLogged ? (
            <ListItem disablePadding>
              <ListItemButton
                component={RouterLink}
                to="/login"
                onClick={closeAndNav}
                className={`drawer-link ${pathname === "/login" ? "is-active" : ""}`}
              >
                Iniciar sesión
              </ListItemButton>
            </ListItem>
          ) : (
            <ListItem disablePadding>
              <ListItemButton onClick={onLogout} className="drawer-link">
                Salir
              </ListItemButton>
            </ListItem>
          )}

          <Divider className="drawer-divider" />

          <ListItem disablePadding>
            <Button
              fullWidth
              component={RouterLink}
              to="/eventos"
              onClick={closeAndNav}
              variant="contained"
              className="drawer-cta"
            >
              Reservar ahora
            </Button>
          </ListItem>
        </List>
      </Drawer>
    </AppBar>
  );
}
