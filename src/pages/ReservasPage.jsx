import { useEffect, useState } from "react";
import { useAuth } from "../context/authContext.jsx";
import { useReservasMock } from "../hooks/useReservasMock";
import { getEventos } from "../mockup/eventosApiMock";
import { Link as RouterLink } from "react-router-dom";
import "../styles/ReservasPage.css";

export default function ReservasPage() {
  const { user } = useAuth();
  const userId = user?.id || user?._id || user?.email || "anon";
  const { lista, loading, err, cancelar } = useReservasMock(userId);
  const [eventosMap, setEventosMap] = useState({});

  useEffect(() => {
    let vivo = true;
    (async () => {
      const evs = await getEventos();
      const map = Object.fromEntries(evs.map(e => [String(e._id ?? e.id), e]));
      if (vivo) setEventosMap(map);
    })();
    return () => { vivo = false; };
  }, []);

  if (loading) return <div className="reservas-wrap">Cargando…</div>;
  if (err) return <div className="reservas-wrap">{err}</div>;

  return (
    <main className="reservas-wrap">
      <header className="reservas-header">
        <h2 className="reservas-title">Mis reservas</h2>
        <span className="reservas-count">{lista.length}</span>
      </header>

      {lista.length === 0 ? (
        <div className="reservas-empty">
          <p>No tenés reservas aún.</p>
          <RouterLink to="/eventos" className="btn ir-eventos">Ver eventos</RouterLink>
        </div>
      ) : (
        <section className="reservas-grid">
          {lista.map(r => {
            const e = eventosMap[String(r.eventoId)];
            if (!e) return null;
            const eid = e._id ?? e.id;
            return (
              <article key={r.id} className="res-card">
                <h3 className="res-title">{e.nombre}</h3>
                <p className="res-meta">
                  <span>{new Date(e.fecha).toLocaleString()}</span> • <span>{e.lugar}</span>
                </p>
                <div className="res-actions">
                  <RouterLink to={`/eventos/${eid}`} className="btn btn-ver">Ver</RouterLink>
                  <button className="btn btn-cancelar" onClick={() => cancelar(eid)}>Cancelar</button>
                </div>
              </article>
            );
          })}
        </section>
      )}
    </main>
  );
}
