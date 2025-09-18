import { useParams } from "react-router-dom";

export default function EditarEventoPage() {
  const { id } = useParams();
  return (
    <div style={{ padding: 16 }}>
      <h2>Editar evento</h2>
      <p>ID: <b>{id}</b></p>
      <p>Esta tambien me falta terminarla</p>
    </div>
  );
}
