import { Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/Navbar";
import Home from "./pages/Home";
import EventosPage from "./pages/EventosPage";
import EventoPage from "./pages/EventoPage";
import CrearEventoPage from "./pages/CrearEventoPage";
import EditarEventoPage from "./pages/EditarEventoPage";
import LoginPage from "./pages/LoginPage";
import AuthProvider from "./context/AuthProvider.jsx";
import Protected from "./components/Proctected.jsx";
import ReservasPage from "./pages/ReservasPage.jsx";

function App() {
  return (
    <AuthProvider>
      <NavBar />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/eventos" element={<EventosPage />} />
          <Route path="/eventos/:id" element={<EventoPage />} />
          <Route
            path="/eventos/nuevo"
            element={
              <Protected roles={["admin"]}>
                <CrearEventoPage />
              </Protected>
            }
          />
          <Route
            path="/eventos/:id/editar"
            element={
              <Protected roles={["admin"]}>
                <EditarEventoPage />
              </Protected>
            }
          />
          <Route path="/mis-reservas" element={<ReservasPage />} />
        </Routes>
      </main>
    </AuthProvider>
  );
}

export default App;
