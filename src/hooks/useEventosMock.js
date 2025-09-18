import { useEffect, useState, useCallback } from "react";
import { getEventos, getEventoById } from "../mockup/eventosApiMock.js";

export function useEventosList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refetch = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getEventos();
      setData(res);
    } catch (e) {
      setError(e?.message || "Error cargando eventos");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { data, loading, error, refetch };
}


export function useEventoDetalle(id) {
  const [evento, setEvento] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cargar = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getEventoById(id);
      setEvento(res);
    } catch (e) {
      setError(e?.message || "Error cargando evento");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) cargar();
  }, [id, cargar]);

  return { evento, loading, error, reload: cargar };
}
