import { leerTodos, escribirTodos } from "../utils/storage.js";
import { esperar } from "../utils/esperar.js";

const normId = v => String(v ?? "");

export async function borrarEvento(id) {
  await esperar(200);
  const lista = leerTodos();
  const eid = normId(id);
  const siguiente = lista.filter(e => normId(e._id ?? e.id) !== eid);
  if (lista.length === siguiente.length) throw new Error("Evento no encontrado");
  escribirTodos(siguiente);
  return true;
}
