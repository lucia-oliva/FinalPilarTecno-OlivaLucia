import { useEffect, useState, useCallback } from "react";
import {
  getEventos,
  getEventoById,
  crearEvento,  
  editarEvento, 
  borrarEvento, 
} from "../mockup/eventosApiMock.js";

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

  const crear = useCallback(async (datos) => {
    await crearEvento(datos);
    await refetch(); 
  }, [refetch]);

  const editar = useCallback(async (id, cambios) => {
    await editarEvento(id, cambios);
    await refetch(); 
  }, [refetch]);

  const borrar = useCallback(async (id) => {
    await borrarEvento(id);
    await refetch(); 
  }, [refetch]);

  return { data, loading, error, refetch, crear, editar, borrar };
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

  const editar = useCallback(async (cambios) => {
    await editarEvento(id, cambios);
    await cargar(); 
  }, [id, cargar]);

  const borrar = useCallback(async () => {
    await borrarEvento(id);
    return true;
  }, [id]);

  return { evento, loading, error, reload: cargar, editar, borrar };
}
