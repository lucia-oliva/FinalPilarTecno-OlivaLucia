import { DB } from "./dbEventos.js";
import { esperar } from "../utils/esperar.js";

export async function crearEvento(datos) {
  await esperar(200);
  const ahora = new Date().toISOString();

  const nuevo = {
    _id: datos._id || "ev_" + Date.now(),
    nombre: datos.nombre || "Sin título",
    descripcion: datos.descripcion || "",
    fecha: datos.fecha || ahora,
    lugar: datos.lugar || "",
    participantes: datos.participantes || [],
    capacidadMaxima: datos.capacidadMaxima ?? 0,
    entradasDisponibles: datos.entradasDisponibles ?? 0,
    createdAt: datos.createdAt || ahora,
    updatedAt: datos.updatedAt || ahora,
    __v: 0,
  };

  DB.push(nuevo);
  return nuevo;
}
