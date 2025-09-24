import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getEventoById, editarEvento, borrarEvento } from "../mockup/eventosApiMock";
import "../styles/EditarEventoPage.css";

export default function EditarEventoPage() {
  const { id } = useParams();
  const nav = useNavigate();

  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [ok, setOk] = useState("");
  const [guardando, setGuardando] = useState(false);
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    fecha: "",
    lugar: "",
    capacidadMaxima: "",
    entradasDisponibles: ""
  });
  const [tocado, setTocado] = useState({});
  const [confOpen, setConfOpen] = useState(false);

  useEffect(() => {
    let vivo = true;
    async function cargar() {
      setError("");
      setOk("");
      setCargando(true);
      try {
        const e = await getEventoById(id);
        if (!vivo) return;
        setForm({
          nombre: e.nombre || "",
          descripcion: e.descripcion || "",
          fecha: e.fecha ? new Date(e.fecha).toISOString().slice(0,16) : "",
          lugar: e.lugar || "",
          capacidadMaxima: e.capacidadMaxima === 0 ? "0" : String(e.capacidadMaxima ?? ""),
          entradasDisponibles: e.entradasDisponibles === 0 ? "0" : String(e.entradasDisponibles ?? "")
        });
      } catch (er) {
        setError(er?.message || "No se pudo cargar el evento");
      } finally {
        setCargando(false);
      }
    }
    cargar();
    return () => { vivo = false };
  }, [id]);

  const hoyLocalISO = useMemo(() => {
    const d = new Date();
    const p = (n) => String(n).padStart(2,"0");
    return `${d.getFullYear()}-${p(d.getMonth()+1)}-${p(d.getDate())}T${p(d.getHours())}:${p(d.getMinutes())}`;
  }, []);

  const errores = (() => {
    const e = {};
    const cap = Number(form.capacidadMaxima);
    const ent = Number(form.entradasDisponibles);
    if (!form.nombre.trim()) e.nombre = "El nombre es obligatorio.";
    if (!form.fecha) e.fecha = "La fecha es obligatoria.";
    if (form.fecha && new Date(form.fecha).toString() === "Invalid Date") e.fecha = "Fecha inválida.";
    if (form.fecha && new Date(form.fecha) < new Date()) e.fecha = "La fecha debe ser futura.";
    if (!form.lugar.trim()) e.lugar = "El lugar es obligatorio.";
    if (form.capacidadMaxima === "" || isNaN(cap) || cap < 0) e.capacidadMaxima = "Capacidad debe ser un número ≥ 0.";
    if (form.entradasDisponibles === "" || isNaN(ent) || ent < 0) e.entradasDisponibles = "Entradas debe ser un número ≥ 0.";
    if (isFinite(cap) && isFinite(ent) && ent > cap) e.entradasDisponibles = "No puede superar la capacidad máxima.";
    return e;
  })();

  const invalido = Object.keys(errores).length > 0;

  function onChange(e) {
    const { name, value } = e.target;
    setForm(f => ({
      ...f,
      [name]: name === "capacidadMaxima" || name === "entradasDisponibles" ? value.replace(/[^\d]/g,"") : value
    }));
  }

  function onBlur(e) {
    const { name } = e.target;
    setTocado(t => ({ ...t, [name]: true }));
  }

  async function onGuardar(e) {
    e.preventDefault();
    setTocado({
      nombre: true,
      fecha: true,
      lugar: true,
      capacidadMaxima: true,
      entradasDisponibles: true,
      descripcion: true
    });
    if (invalido) return;
    setGuardando(true);
    setError("");
    setOk("");
    try {
      await editarEvento(id, {
        nombre: form.nombre.trim(),
        descripcion: form.descripcion.trim(),
        fecha: form.fecha ? new Date(form.fecha).toISOString() : null,
        lugar: form.lugar.trim(),
        capacidadMaxima: Number(form.capacidadMaxima || 0),
        entradasDisponibles: Number(form.entradasDisponibles || 0)
      });
      setOk("Cambios guardados");
    } catch (er) {
      setError(er?.message || "No se pudo guardar");
    } finally {
      setGuardando(false);
    }
  }

  async function onEliminarConfirmado() {
    try {
      await borrarEvento(id);
      nav("/eventos");
    } catch (er) {
      setError(er?.message || "No se pudo eliminar");
    } finally {
      setConfOpen(false);
    }
  }

  if (cargando) {
    return (
      <div className="editar-caja">
        <h2 className="editar-titulo">Editar evento</h2>
        <div className="alerta alerta-ok">Cargando…</div>
      </div>
    );
  }

  return (
    <div className="editar-caja">
      <h2 className="editar-titulo">Editar evento</h2>

      <form onSubmit={onGuardar} className="form-grid">
        <div className="campo">
          <label>Nombre</label>
          <input name="nombre" value={form.nombre} onChange={onChange} onBlur={onBlur} />
          {tocado.nombre && errores.nombre ? <div className="msg-error">{errores.nombre}</div> : null}
        </div>

        <div className="campo">
          <label>Descripción</label>
          <textarea name="descripcion" value={form.descripcion} onChange={onChange} onBlur={onBlur} />
        </div>

        <div className="campo">
          <label>Fecha</label>
          <input type="datetime-local" name="fecha" value={form.fecha} onChange={onChange} onBlur={onBlur} min={hoyLocalISO} />
          <div className="leyenda">Se guarda en formato ISO</div>
          {tocado.fecha && errores.fecha ? <div className="msg-error">{errores.fecha}</div> : null}
        </div>

        <div className="campo">
          <label>Lugar</label>
          <input name="lugar" value={form.lugar} onChange={onChange} onBlur={onBlur} />
          {tocado.lugar && errores.lugar ? <div className="msg-error">{errores.lugar}</div> : null}
        </div>

        <div className="campo">
          <label>Capacidad máxima</label>
          <input type="number" name="capacidadMaxima" value={form.capacidadMaxima} onChange={onChange} onBlur={onBlur} min="0" step="1" />
          {tocado.capacidadMaxima && errores.capacidadMaxima ? <div className="msg-error">{errores.capacidadMaxima}</div> : null}
        </div>

        <div className="campo">
          <label>Entradas disponibles</label>
          <input type="number" name="entradasDisponibles" value={form.entradasDisponibles} onChange={onChange} onBlur={onBlur} min="0" step="1" />
          {tocado.entradasDisponibles && errores.entradasDisponibles ? <div className="msg-error">{errores.entradasDisponibles}</div> : null}
        </div>

        {ok ? <div className="alerta alerta-ok">{ok}</div> : null}
        {error ? <div className="alerta alerta-err">{error}</div> : null}

        <div className="fila-botones">
          <button type="submit" disabled={guardando || invalido} className="btn-primario">{guardando ? "Guardando…" : "Guardar cambios"}</button>
          <button type="button" onClick={() => setConfOpen(true)} className="btn-peligro">Eliminar</button>
        </div>
      </form>

      {confOpen && (
        <div className="confirm-backdrop" role="dialog" aria-modal="true">
          <div className="confirm-modal">
            <h3>Eliminar evento</h3>
            <p>Esta acción no se puede deshacer. ¿Deseás eliminar este evento?</p>
            <div className="confirm-actions">
              <button className="btn-secundario" onClick={() => setConfOpen(false)}>Cancelar</button>
              <button className="btn-peligro" onClick={onEliminarConfirmado}>Eliminar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
