import { Card, CardContent, CardActions, Typography, Button, Stack, Box, Chip } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import CupoBadge from "./CupoBadge";
import { formatDateISOToLocal } from "../../utils/date";
import "../../styles/EventoCard.css";

export default function EventoCard({ e }) {
  return (
    <Card variant="outlined" className="eventocard-root">
      <Box className="eventocard-cover">
        <Chip label={formatDateISOToLocal(e.fecha)} size="small" className="date-chip" />
      </Box>

      <CardContent className="eventocard-content">
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" className="eventocard-header">
          <Typography variant="h6" className="eventocard-title">{e.nombre}</Typography>
          {typeof e.entradasDisponibles !== "undefined" && (
            <CupoBadge disponibles={e.entradasDisponibles} />
          )}
        </Stack>

        <Typography variant="body2" color="text.secondary" className="eventocard-meta">
          {e.lugar}
        </Typography>

        {e.descripcion && (
          <Typography variant="body2" className="eventocard-desc">
            {e.descripcion}
          </Typography>
        )}
      </CardContent>

      <CardActions className="eventocard-actions">
        <Button
          component={RouterLink}
          to={`/eventos/${e._id}`}
          size="small"
          variant="contained"
          className="eventocard-button"
        >
          Ver detalle
        </Button>
      </CardActions>
    </Card>
  );
}
