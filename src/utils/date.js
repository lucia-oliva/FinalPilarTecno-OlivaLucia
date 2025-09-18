
export function formatDateISOToLocal(isoString) {
  if (!isoString) return "";

  try {
    const d = new Date(isoString);
    return d.toLocaleString("es-AR", {
      dateStyle: "medium", 
      timeStyle: "short", 
    });
  } catch {
    return isoString;
  }
}
