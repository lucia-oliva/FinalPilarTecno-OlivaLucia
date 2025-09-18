import { Grid, Alert, CircularProgress, Box } from "@mui/material";
import EventoCard from "./EventoCard";
import "../../styles/EventoList.css";

export default function EventosList({ data = [], loading = false, error = null }) {
  if (loading) {
    return (
      <Box className="eventoslist-loader" aria-label="Cargando">
        <CircularProgress />
      </Box>
    );
  }

  if (error) return <Alert severity="error">{error}</Alert>;
  if (!data.length) return <Alert severity="info">No hay eventos disponibles.</Alert>;

  return (
    <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }} className="eventoslist-grid">
      {data.map((e) => (
        <Grid key={e._id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <EventoCard e={e} />
        </Grid>
      ))}
    </Grid>
  );
}
