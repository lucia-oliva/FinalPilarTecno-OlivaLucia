import { useMemo, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  Snackbar,
  Divider,
} from "@mui/material";
import { useEventosList } from "../hooks/useEventosMock";
import { useAuth } from "../context/useAuth";
import "../styles/CrearEventoPage.css";

export default function CrearEventoPage() {
  const { user } = useAuth() || {};
  const esAdmin = String(user?.rol || "").toLowerCase() === "admin";
  const { crear } = useEventosList();

  const [form, setForm] = useState({
    nombre: "",
    fecha: "",
    lugar: "",
    capacidadMaxima: "",
    entradasDisponibles: "",
    descripcion: "",
  });
  const [tocado, setTocado] = useState({});
  const [loading, setLoading] = useState(false);
  const [alerta, setAlerta] = useState({ open: false, tipo: "success", msg: "" });

  const hoyLocalISO = useMemo(() => {
    const d = new Date();
    const p = (n) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}T${p(
      d.getHours()
    )}:${p(d.getMinutes())}`;
  }, []);

  const errores = (() => {
    const e = {};
    const cap = Number(form.capacidadMaxima);
    const ent = Number(form.entradasDisponibles);

    if (!form.nombre.trim()) e.nombre = "El nombre es obligatorio.";
    if (!form.fecha) e.fecha = "La fecha es obligatoria.";
    if (form.fecha && new Date(form.fecha).toString() === "Invalid Date")
      e.fecha = "Fecha inválida.";
    if (form.fecha && new Date(form.fecha) < new Date())
      e.fecha = "La fecha debe ser futura.";
    if (!form.lugar.trim()) e.lugar = "El lugar es obligatorio.";

    if (form.capacidadMaxima === "" || isNaN(cap) || cap < 0)
      e.capacidadMaxima = "Capacidad debe ser un número ≥ 0.";
    if (form.entradasDisponibles === "" || isNaN(ent) || ent < 0)
      e.entradasDisponibles = "Entradas debe ser un número ≥ 0.";
    if (isFinite(cap) && isFinite(ent) && ent > cap)
      e.entradasDisponibles = "No puede superar la capacidad máxima.";

    return e;
  })();

  const invalido = Object.keys(errores).length > 0;

  function onChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setTocado({
      nombre: true,
      fecha: true,
      lugar: true,
      capacidadMaxima: true,
      entradasDisponibles: true,
      descripcion: true,
    });
    if (invalido) return;

    try {
      setLoading(true);
      await crear({
        nombre: form.nombre.trim(),
        descripcion: form.descripcion.trim(),
        fecha: new Date(form.fecha).toISOString(),
        lugar: form.lugar.trim(),
        participantes: [],
        capacidadMaxima: Number(form.capacidadMaxima),
        entradasDisponibles: Number(form.entradasDisponibles),
      });
      setAlerta({ open: true, tipo: "success", msg: "Evento creado correctamente." });
      setForm({
        nombre: "",
        fecha: "",
        lugar: "",
        capacidadMaxima: "",
        entradasDisponibles: "",
        descripcion: "",
      });
      setTocado({});
    } catch (err) {
      setAlerta({
        open: true,
        tipo: "error",
        msg: err?.message || "No se pudo crear el evento.",
      });
    } finally {
      setLoading(false);
    }
  }

  if (!esAdmin) {
    return (
      <main className="cef-wrap">
        <Paper elevation={0} className="cef-card">
          <Alert severity="warning" className="cef-alert">
            Solo el usuario con rol <strong>admin</strong> puede crear o editar eventos.
          </Alert>
          <Typography className="cef-title">Permisos insuficientes</Typography>
          <Typography className="cef-subtitle">
            Iniciá sesión con una cuenta de administrador para continuar.
          </Typography>
        </Paper>
      </main>
    );
  }

  return (
    <main className="cef-wrap">
      <Paper elevation={0} className="cef-card">
        <Typography className="cef-title">Crear evento</Typography>
        <Divider className="cef-divider" />

        <Box component="form" onSubmit={onSubmit} noValidate className="cef-form">
  
          <div className="cef-field">
            <TextField
              className="cef-input"
              label="Nombre *"
              name="nombre"
              fullWidth
              value={form.nombre}
              onChange={onChange}
              onBlur={() => setTocado((t) => ({ ...t, nombre: true }))}
              error={tocado.nombre && !!errores.nombre}
              helperText={tocado.nombre && errores.nombre ? errores.nombre : ""}
            />
          </div>

       
          <div className="cef-field">
            <TextField
              className="cef-input"
              label="Fecha y hora *"
              name="fecha"
              type="datetime-local"
              fullWidth
              value={form.fecha}
              onChange={onChange}
              onBlur={() => setTocado((t) => ({ ...t, fecha: true }))}
              error={tocado.fecha && !!errores.fecha}
              helperText={tocado.fecha && errores.fecha ? errores.fecha : ""}
              InputLabelProps={{ shrink: true }}
              inputProps={{ min: hoyLocalISO }}
            />
          </div>

          <div className="cef-field">
            <TextField
              className="cef-input"
              label="Lugar *"
              name="lugar"
              fullWidth
              value={form.lugar}
              onChange={onChange}
              onBlur={() => setTocado((t) => ({ ...t, lugar: true }))}
              error={tocado.lugar && !!errores.lugar}
              helperText={tocado.lugar && errores.lugar ? errores.lugar : ""}
            />
          </div>

          <div className="cef-field">
            <TextField
              className="cef-input"
              label="Capacidad máxima *"
              name="capacidadMaxima"
              type="number"
              fullWidth
              value={form.capacidadMaxima}
              onChange={onChange}
              onBlur={() => setTocado((t) => ({ ...t, capacidadMaxima: true }))}
              error={tocado.capacidadMaxima && !!errores.capacidadMaxima}
              helperText={
                tocado.capacidadMaxima && errores.capacidadMaxima ? errores.capacidadMaxima : ""
              }
              inputProps={{ min: 0, step: 1 }}
            />
          </div>
          <div className="cef-field">
            <TextField
              className="cef-input"
              label="Entradas disponibles *"
              name="entradasDisponibles"
              type="number"
              fullWidth
              value={form.entradasDisponibles}
              onChange={onChange}
              onBlur={() => setTocado((t) => ({ ...t, entradasDisponibles: true }))}
              error={tocado.entradasDisponibles && !!errores.entradasDisponibles}
              helperText={
                tocado.entradasDisponibles && errores.entradasDisponibles
                  ? errores.entradasDisponibles
                  : ""
              }
              inputProps={{ min: 0, step: 1 }}
            />
          </div>
          <div className="cef-field">
            <TextField
              className="cef-input"
              label="Descripción"
              name="descripcion"
              fullWidth
              multiline
              minRows={1}
              value={form.descripcion}
              onChange={onChange}
              onBlur={() => setTocado((t) => ({ ...t, descripcion: true }))}
              InputLabelProps={{ shrink: true }}
              helperText=""  
            />
          </div>

          <div className="cef-actions">
            <Button
              type="submit"
              variant="contained"
              disableElevation
              disabled={loading}
              className="cef-btn"
            >
              {loading ? "Creando..." : "Crear evento"}
            </Button>
          </div>
        </Box>
      </Paper>

      <Snackbar
        open={alerta.open}
        autoHideDuration={3500}
        onClose={() => setAlerta((a) => ({ ...a, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity={alerta.tipo}
          onClose={() => setAlerta((a) => ({ ...a, open: false }))}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {alerta.msg}
        </Alert>
      </Snackbar>
    </main>
  );
}
