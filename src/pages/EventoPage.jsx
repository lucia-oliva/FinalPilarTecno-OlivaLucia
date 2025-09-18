import { useParams } from "react-router-dom";
import { Container, Alert, Paper, Stack, Typography, Box, Button, Divider } from "@mui/material";
import { useEventoDetalle } from "../hooks/useEventosMock";
import { formatDateISOToLocal } from "../utils/date";
import CupoBadge from "../components/Eventos/CupoBadge";
import "../styles/EventoPage.css";

export default function EventoPage() {
  const { id } = useParams();
  const { evento, loading, error } = useEventoDetalle(id);

  if (loading) {
    return (
      <Container className="evento-container"><Alert severity="info">Cargando…</Alert></Container>
    );
  }
  if (error) {
    return (
      <Container className="evento-container"><Alert severity="error">{error}</Alert></Container>
    );
  }
  if (!evento) {
    return (
      <Container className="evento-container"><Alert severity="warning">Evento no encontrado.</Alert></Container>
    );
  }

  return (
    <Container className="evento-container">
      <Box className="evento-grid">
        <Paper variant="outlined" className="evento-card">
          <Box className="evento-cover" />
          <Stack
            direction="row"
            alignItems="flex-start"
            justifyContent="space-between"
            className="evento-header"
          >
            <Typography variant="h4" className="evento-title">{evento.nombre}</Typography>
            {typeof evento.entradasDisponibles !== "undefined" && (
              <CupoBadge disponibles={evento.entradasDisponibles} />
            )}
          </Stack>

          <Typography color="text.secondary" className="evento-meta">
            {evento.lugar} — {formatDateISOToLocal(evento.fecha)}
          </Typography>

          {evento.descripcion && (
            <Typography className="evento-desc">{evento.descripcion}</Typography>
          )}
        </Paper>

        <Box className="evento-side">
          <Paper variant="outlined" className="evento-sidecard">
            <Typography variant="subtitle1" className="side-title">Resumen</Typography>
            <Divider />
            <Box className="side-row">
              <span className="side-key">Fecha</span>
              <span className="side-val">{formatDateISOToLocal(evento.fecha)}</span>
            </Box>
            <Box className="side-row">
              <span className="side-key">Lugar</span>
              <span className="side-val">{evento.lugar}</span>
            </Box>
            <Divider />
            <Button variant="contained" size="large" className="side-cta">
              Reservar cupo
            </Button>
          </Paper>
        </Box>
      </Box>
    </Container>
  );
}
