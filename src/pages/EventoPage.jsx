import { getEventoById } from "../mockup/eventosApiMock.js";
import { useEffect, useState } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import { useAuth } from "../context/authContext.jsx";
import { useReservasMock } from "../hooks/useReservasMock.js";
import "../styles/EventoPage.css";

export default function EventoPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const userId = user?.id || user?._id || user?.email || null;
  const { reservar, cancelar, estaReservado } = useReservasMock(userId);
  const [evento, setEvento] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [reservado, setReservado] = useState(false);
  const [busy, setBusy] = useState(false);
  const cupos = Number(evento?.entradasDisponibles ?? 0);

  useEffect(() => {
    let vivo = true;
    (async () => {
      try {
        const e = await getEventoById(id);
        if (!vivo) return;
        setEvento(e);
      } catch (er) {
        setError(er?.message || "Error");
      } finally {
        setCargando(false);
      }
    })();
    return () => { vivo = false };
  }, [id]);

  useEffect(() => {
    let vivo = true;
    (async () => {
      if (!userId || !id) return;
      const r = await estaReservado(id);
      if (vivo) setReservado(r);
    })();
    return () => { vivo = false; };
  }, [userId, id, estaReservado]);

async function onToggleReserva() {
  if (!userId) return;
  setBusy(true);
  try {

   if (reservado) await cancelar(id);
   else await reservar(id);

    const e = await getEventoById(id);
    setEvento(e);

   const r = await estaReservado(id);
    setReservado(r);
  } catch (e) {
    setError(e?.message || "Error al reservar");
  } finally {
    setBusy(false);
  }
}



  if (cargando) return <div className="evento-detalle">Cargando…</div>;
  if (error) return <div className="evento-detalle">{error}</div>;
  if (!evento) return <div className="evento-detalle">Evento no encontrado</div>;

  return (
    <div className="evento-detalle">
      <header className="evento-hero">
        <div className="evento-hero__wrap">
          <h2 className="evento-hero__title">{evento.nombre}</h2>
          <p className="evento-hero__meta">
            <span className="pill">{new Date(evento.fecha).toLocaleString()}</span>
            <span className="dot" aria-hidden />
            <span className="pill alt">{evento.lugar}</span>
          </p>
        </div>
      </header>

      <section className="evento-body">
        <article className="evento-card">
          <h3 className="evento-card__heading">Descripción</h3>
          <p className="evento-card__text">{evento.descripcion}</p>

          <ul className="evento-info">
            <li>
              <span className="info-label">Fecha</span>
              <span className="info-value">{new Date(evento.fecha).toLocaleString()}</span>
            </li>
            <li>
              <span className="info-label">Lugar</span>
              <span className="info-value">{evento.lugar}</span>
            </li>
            <li>
              <span className="info-label">Cupos disponibles</span>
              <span className="info-value">{cupos}</span>
            </li>
          </ul>

          <div className="evento-acciones">
            <RouterLink to="/eventos" className="btn btn-volver">Volver</RouterLink>
            {userId && (
              <button
                type="button"
                className={`btn ${reservado ? "btn-cancelar" : "btn-reservar"}`}
                onClick={onToggleReserva}
                disabled={busy || (!reservado && cupos <= 0)}
              >
                {busy ? "Procesando…" : reservado ? "Cancelar reserva" : "Reservar cupo"}
              </button>
            )}
            {user?.rol?.toLowerCase() === "admin" && (
              <RouterLink to={`/eventos/${id}/editar`} className="btn btn-editar">Editar</RouterLink>
            )}
          </div>
        </article>
      </section>
    </div>
  );
}
