import { AppBar, Toolbar, Typography, Button, Stack, Box, Divider } from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";
import "../styles/Navbar.css";

export default function NavBar() {
  const { pathname } = useLocation();

  return (
    <AppBar position="sticky" elevation={0} color="transparent" className="navbar-appbar">
      <Toolbar className="navbar-toolbar">
        <Box className="brand">
          <Box className="brand-mark" aria-hidden />
          <Typography variant="h6" className="navbar-title">Bodas & Eventos</Typography>
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
            className={`navbar-link ${pathname.startsWith("/eventos") ? "is-active" : ""}`}
          >
            Eventos
          </Button>
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
