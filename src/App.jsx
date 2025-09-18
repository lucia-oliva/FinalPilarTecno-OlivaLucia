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

function App() {
  return (
    <AuthProvider>
      <NavBar />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          {/*PUBLICO*/}
          <Route path="/eventos" element={<EventosPage />} />
          <Route path="/eventos/:id" element={<EventoPage />} />

          {/*ADMIN */}
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
        </Routes>
      </main>
    </AuthProvider>
  );
}

export default App;
