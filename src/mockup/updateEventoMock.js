import { leerTodos, escribirTodos } from "../utils/storage.js";
import { esperar } from "../utils/esperar.js";

const normId = v => String(v ?? "");

export async function editarEvento(id, cambios) {
  await esperar(200);
  const lista = leerTodos();
  const eid = normId(id);
  const i = lista.findIndex(e => normId(e._id ?? e.id) === eid);
  if (i === -1) throw new Error("Evento no encontrado");

  const prev = lista[i];
  const capacidad = Number(cambios?.capacidadMaxima ?? prev.capacidadMaxima ?? 0);

  let entradas = (cambios?.entradasDisponibles != null)
    ? Number(cambios.entradasDisponibles)
    : prev.entradasDisponibles;

  if (Number.isFinite(capacidad)) {
    entradas = Math.max(0, Math.min(Number(entradas ?? 0), capacidad || entradas));
  }

  const actualizado = {
    ...prev,
    ...cambios,
    capacidadMaxima: capacidad,
    entradasDisponibles: entradas,
    _id: normId(prev._id ?? prev.id),
    updatedAt: new Date().toISOString(),
  };

  lista[i] = actualizado;
  escribirTodos(lista);
  return actualizado;
}
