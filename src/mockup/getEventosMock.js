import { leerTodos, escribirTodos } from "../utils/storage.js"
import { DB } from "./dbEventos.js"
import { esperar } from "../utils/esperar.js"

export async function getEventos() {
  await esperar(200)
  const lista = leerTodos()
  if (lista.length === 0 && Array.isArray(DB) && DB.length > 0) {
    escribirTodos(DB)
    return DB.slice()
  }
  return lista
}
