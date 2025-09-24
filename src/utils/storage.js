const CLAVE = "eventos"

export function leerTodos() {
  try {
    const bruto = localStorage.getItem(CLAVE)
    return bruto ? JSON.parse(bruto) : []
  } catch {
    localStorage.removeItem(CLAVE)
    return []
  }
}

export function escribirTodos(lista) {
  localStorage.setItem(CLAVE, JSON.stringify(lista))
}

export function generarId() {
  return `ev_${Date.now()}_${Math.random().toString(36).slice(2,8)}`
}
