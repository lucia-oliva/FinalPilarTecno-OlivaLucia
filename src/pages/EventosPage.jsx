import { getEventos } from "../mockup/eventosApiMock.js";
import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../context/authContext.jsx";
import EventosList from "../components/Eventos/EventoList";
import "../styles/EventosPage.css";

const DBG = (...a) => console.log("[EventoPage]", ...a);

export default function EventosPage() {
  const { user } = useAuth();
  const esAdmin = String(user?.rol || "").toLowerCase() === "admin";
  const [lista, setLista] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    
    let vivo = true;
    (async () => {
      try {
        const data = await getEventos();
        if (!vivo) return;
        setLista(data);
      } catch (er) {
        setError(er?.message || "Error");
      } finally {
        setCargando(false);
      }
    })();
    return () => { vivo = false };
  }, []);

  return (
    <div className="eventos-caja">
      <div className="eventos-header">
        <div className="eventos-head-left">
          <h2 className="eventos-titulo">Eventos</h2>
          <span className="eventos-count">{lista.length}</span>
        </div>
        {esAdmin && (
          <RouterLink to="/eventos/nuevo" className="btn btn-crear">Crear evento</RouterLink>
        )}
      </div>

      <EventosList data={lista} loading={cargando} error={error} />
    </div>
  );
}
