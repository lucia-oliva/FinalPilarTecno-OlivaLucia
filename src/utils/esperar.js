export function esperar(ms = 200) {
  return new Promise((r) => setTimeout(r, ms));
}
