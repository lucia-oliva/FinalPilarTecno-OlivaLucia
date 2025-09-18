import { DB } from "./dbEventos.js";
import { esperar } from "../utils/esperar.js";

export async function getEventos() {
  await esperar(200);
  return DB.slice();
}
