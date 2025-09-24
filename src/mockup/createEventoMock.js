import { leerTodos, escribirTodos, generarId } from "../utils/storage.js"
import { esperar } from "../utils/esperar.js"

export async function crearEvento(datos) {
  await esperar(200)
  const ahora = new Date().toISOString()
  const nuevo = {
    _id: datos._id || generarId(),
    nombre: datos.nombre || "Sin título",
    descripcion: datos.descripcion || "",
    fecha: datos.fecha || ahora,
    lugar: datos.lugar || "",
    participantes: datos.participantes || [],
    capacidadMaxima: datos.capacidadMaxima ?? 0,
    entradasDisponibles: datos.entradasDisponibles ?? 0,
    createdAt: ahora,
    updatedAt: ahora
  }
  const lista = leerTodos()
  lista.push(nuevo)
  escribirTodos(lista)
  return nuevo
}
