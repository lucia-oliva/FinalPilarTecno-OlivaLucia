import { DB } from "./dbEventos.js";
import { esperar } from "../utils/esperar.js";

export async function borrarEvento(id) {
  await esperar(200);
  const i = DB.findIndex((e) => String(e._id) === String(id));
  if (i === -1) throw new Error("Evento no encontrado");
  DB.splice(i, 1);
  return true;
}
