import { leerTodos, escribirTodos } from "../utils/storage.js";
import { esperar } from "../utils/esperar.js";
import { DB } from "./dbEventos.js"; // <-- IMPORTANTE

const normId = v => String(v ?? "");

function findById(arr, id) {
  const eid = normId(id);
  return arr.find(e => normId(e._id ?? e.id) === eid) || null;
}

export async function getEventoById(id) {
  await esperar(200);

  const lista = leerTodos();
  let evento = findById(lista, id);
  if (evento) return evento;

  if (Array.isArray(DB) && DB.length) {
    const desdeDB = findById(DB, id);
    if (desdeDB) {
      const merged = [...lista, { ...desdeDB, _id: normId(desdeDB._id ?? desdeDB.id) }];
      escribirTodos(merged);
      return desdeDB;
    }
  }

  throw new Error("Evento no encontrado");
}
