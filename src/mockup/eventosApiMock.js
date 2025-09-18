
import { getEventMockup } from "./getEventos.js";
import { eventSelectedMockup } from "./eventoSeleccionado.js";

const delay = (ms = 300) => new Promise((r) => setTimeout(r, ms));


let DB = JSON.parse(JSON.stringify(getEventMockup));


if (!DB.find((e) => e._id === eventSelectedMockup._id)) {
  DB.unshift(JSON.parse(JSON.stringify(eventSelectedMockup)));
}

export async function getEventos() {
  await delay();
  return JSON.parse(JSON.stringify(DB));
}


export async function getEventoById(id) {
  await delay();
  const ev = DB.find((e) => e._id === id);
  if (!ev) throw new Error("Evento no encontrado");
  return JSON.parse(JSON.stringify(ev));
}
