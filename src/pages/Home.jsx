import { Container, Paper, Stack, Typography, Button, Box } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import "../styles/Home.css";

export default function Home() {
  return (
    <Container className="home-container">
      <Paper elevation={0} className="home-hero hero-gradient">
        <Box className="hero-grid">
          <Stack spacing={2.5} className="hero-col hero-copy">
            <Typography variant="h2" className="home-title">
              Sistema de Gestión Eventos de Bodas
            </Typography>

            <Typography className="home-subtitle">
              Workshops y experiencias para planificar, coordinar y producir eventos nupciales.
            </Typography>

            <Stack direction="row" spacing={1.5} className="hero-ctas">
              <Button
                component={RouterLink}
                to="/eventos"
                variant="contained"
                className="home-cta"
              >
                Ver próximos eventos
              </Button>
            </Stack>

            <Box className="hero-bullets">
              <div className="bullet">
                <span className="bullet-icon">✓</span>
                <span>Mentores con experiencia real</span>
              </div>
              <div className="bullet">
                <span className="bullet-icon">⬇</span>
                <span>Material descargable</span>
              </div>
              <div className="bullet">
                <span className="bullet-icon">👥</span>
                <span>Grupos reducidos</span>
              </div>
            </Box>
          </Stack>

          <Box
            className="hero-col hero-photo"
            role="img"
            aria-label="Pareja en un salón de boda"
          />
        </Box>

        <Box className="wave-sep" aria-hidden />
      </Paper>

      <Box className="section section-soft">
        <Container className="container-like">
          <Stack spacing={2} alignItems="center" textAlign="center">
            <Typography variant="h4">Haz tu evento inolvidable</Typography>
            <Typography className="section-sub">
              Diseño, logística y producción integral: aprende con casos reales y
              herramientas profesionales.
            </Typography>
          </Stack>
        </Container>
      </Box>
    </Container>
  );
}
