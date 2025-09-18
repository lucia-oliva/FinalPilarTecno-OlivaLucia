import { Container, Typography, Box } from "@mui/material";
import { useEventosList } from "../hooks/useEventosMock";
import EventosList from "../components/Eventos/EventoList";
import "../styles/EventosPage.css";

export default function EventosPage() {
  const { data, loading, error } = useEventosList();

  return (
    <Box className="eventos-wrap">
      <Container className="eventos-container">
        <Typography variant="h3" className="eventos-title">
          Workshops & Experiencias Nupciales
        </Typography>
        <Typography className="eventos-sub">
          Agenda actualizada, cupos limitados y contenidos prácticos.
        </Typography>

        <EventosList data={data} loading={loading} error={error} />
      </Container>
      <Box className="wave-sep-bottom" aria-hidden />
    </Box>
  );
}
