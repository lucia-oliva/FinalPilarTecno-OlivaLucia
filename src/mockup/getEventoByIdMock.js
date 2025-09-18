
import { DB } from "./dbEventos.js";
import { esperar } from "../utils/esperar.js";

export async function getEventoById(id) {
  await esperar(200);
  const ev = DB.find((e) => String(e._id) === String(id));
  if (!ev) throw new Error("Evento no encontrado");
  return ev;
}
