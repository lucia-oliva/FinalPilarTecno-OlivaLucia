import { Chip } from "@mui/material";
import "../../styles/CupoBadge.css";

export default function CupoBadge({ disponibles = 0 }) {
  const agotado = Number(disponibles) <= 0;
  return (
    <Chip
      className={`cupobadge-root ${agotado ? "is-out" : "is-ok"}`}
      label={agotado ? "Completo" : `Cupos: ${disponibles}`}
      color={agotado ? "error" : "success"}
      size="small"
      role="status"
      aria-live="polite"
      variant="filled"
    />
  );
}
