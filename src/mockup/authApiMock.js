import { USERS } from "./dbUsuarios.js";
import { esperar } from "../utils/esperar.js";

export async function login(email, password) {
  await esperar(300);
  const user = USERS.find(u => u.email === email && u.password === password);
  if (!user) throw new Error("Credenciales inválidas");
  const token = "mock-" + user._id;
  return { user: { _id: user._id, nombre: user.nombre, email: user.email, rol: user.rol }, token };
}

export async function logout() {
  await esperar(100);
  return true;
}
