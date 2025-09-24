// src/hooks/useReservasMock.js
import { useCallback, useEffect, useState } from "react";
import {
  getReservasByUser as apiGetReservasByUser,
  isReservado as apiIsReservado,
  reservarCupo as apiReservarCupo,
  cancelarReserva as apiCancelarReserva,
} from "../mockup/reservasApiMock.js";

const DBG = (...a) => console.log("[useReservasMock]", ...a);

export function useReservasMock(userId) {
  const [lista, setLista] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    DBG("init hook", { userId, type: typeof userId });
  }, [userId]);

  const cargar = useCallback(async () => {
    if (!userId) { setLista([]); setLoading(false); DBG("cargar: sin user"); return; }
    setLoading(true); setErr("");
    try {
      const r = await apiGetReservasByUser(userId);
      DBG("cargar: reservas", { count: r.length });
      setLista(r);
    } catch (e) {
      const msg = e?.message || "Error al cargar reservas";
      DBG("cargar: ERROR", msg);
      setErr(msg);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => { cargar(); }, [cargar]);

  const reservar = useCallback(async (eventoId) => {
    DBG("reservar()", { userId, eventoId, types: { userId: typeof userId, eventoId: typeof eventoId } });
    const r = await apiReservarCupo(userId, eventoId);
    await cargar();
    return r;
  }, [userId, cargar]);

  const cancelar = useCallback(async (eventoId) => {
    DBG("cancelar()", { userId, eventoId });
    const ok = await apiCancelarReserva(userId, eventoId);
    await cargar();
    return ok;
  }, [userId, cargar]);

  const estaReservado = useCallback(async (eventoId) => {
    DBG("estaReservado()", { userId, eventoId });
    if (!userId) return false;
    return apiIsReservado(userId, eventoId);
  }, [userId]);

  return { lista, loading, err, reservar, cancelar, estaReservado, refresh: cargar };
}
