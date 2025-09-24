// src/mockup/reservasApiMock.js
import { getEventoById, editarEvento, getEventos } from "./eventosApiMock.js";

const LS_RESERVAS = "dbReservas";
const normId = v => String(v ?? "");
const uuid = () =>
  (globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`);

const DBG = (...a) => console.log("[reservasApi]", ...a);

function loadJSON(key, def) { try { return JSON.parse(localStorage.getItem(key)) ?? def; } catch { return def; } }
function saveJSON(key, value) { localStorage.setItem(key, JSON.stringify(value)); }

export async function getReservasByUser(userId) {
  const uid = normId(userId);
  const all = loadJSON(LS_RESERVAS, []);
  DBG("getReservasByUser", { uid, total: all.length });
  return all.filter(r => normId(r.userId) === uid);
}

export async function isReservado(userId, eventoId) {
  const uid = normId(userId), eid = normId(eventoId);
  const all = loadJSON(LS_RESERVAS, []);
  const ok = all.some(r => normId(r.userId) === uid && normId(r.eventoId) === eid);
  DBG("isReservado?", { uid, eid, ok });
  return ok;
}

export async function reservarCupo(userId, eventoId) {
  const uid = normId(userId);
  const eid = normId(eventoId);
  DBG("reservarCupo:start", { uid, eid, types: { userId: typeof userId, eventoId: typeof eventoId } });

  let ev = null;
  try {
    ev = await getEventoById(eid);
    DBG("getEventoById→", ev ? "ENCONTRADO" : "NO", ev);
  } catch (e) {
    DBG("getEventoById lanzó error:", e?.message);
  }


  if (!ev) {
    const all = await getEventos().catch(() => []);
    DBG("fallback:getEventos()", { total: all?.length ?? 0 });
    ev = (all || []).find(e => normId(e._id ?? e.id) === eid) || null;
    DBG("fallback match→", ev ? "ENCONTRADO" : "NO", ev);
  }

  if (!ev) {
    DBG("❌ Evento no encontrado con ese id", { eid });
    throw new Error("Evento no encontrado");
  }

  const cupos = Number(ev.entradasDisponibles ?? 0);
  DBG("cupos disponibles", { cupos, capacidadMaxima: ev.capacidadMaxima });

  if (cupos <= 0) {
    DBG("❌ Sin cupos");
    throw new Error("No hay cupos disponibles");
  }

  const reservas = loadJSON(LS_RESERVAS, []);
  const ya = reservas.some(r => normId(r.userId) === uid && normId(r.eventoId) === eid);
  DBG("¿Ya reservado?", ya);

  if (ya) throw new Error("Ya reservaste este evento");

  const nueva = { id: uuid(), userId: uid, eventoId: eid, fechaReserva: new Date().toISOString() };
  reservas.push(nueva);
  saveJSON(LS_RESERVAS, reservas);
  DBG("Reserva creada", nueva);

  const nuevoCupo = cupos - 1;
  DBG("editarEvento() para descontar cupo", { eid, nuevoCupo });
  await editarEvento(eid, { ...ev, entradasDisponibles: nuevoCupo });

  return nueva;
}

export async function cancelarReserva(userId, eventoId) {
  const uid = normId(userId);
  const eid = normId(eventoId);
  DBG("cancelarReserva:start", { uid, eid });

  const reservas = loadJSON(LS_RESERVAS, []);
  const ix = reservas.findIndex(r => normId(r.userId) === uid && normId(r.eventoId) === eid);
  DBG("índice reserva", ix);

  if (ix === -1) throw new Error("Reserva no encontrada");
  reservas.splice(ix, 1);
  saveJSON(LS_RESERVAS, reservas);
  DBG("Reserva eliminada");

  let ev = null;
  try {
    ev = await getEventoById(eid);
    DBG("getEventoById→", ev ? "ENCONTRADO" : "NO", ev);
  } catch (e) {
    DBG("getEventoById lanzó error:", e?.message);
  }

  if (!ev) {
    const all = await getEventos().catch(() => []);
    DBG("fallback:getEventos()", { total: all?.length ?? 0 });
    ev = (all || []).find(e => normId(e._id ?? e.id) === eid) || null;
    DBG("fallback match→", ev ? "ENCONTRADO" : "NO", ev);
  }

  if (ev) {
    const cap = Number(ev.capacidadMaxima ?? 0) || Infinity;
    const disp = Math.min(Number(ev.entradasDisponibles ?? 0) + 1, cap);
    DBG("editarEvento() para devolver cupo", { eid, nuevoDisp: disp, cap });
    await editarEvento(eid, { ...ev, entradasDisponibles: disp });
  } else {
    DBG("No pude recuperar el evento para devolver cupo", { eid });
  }

  return true;
}
