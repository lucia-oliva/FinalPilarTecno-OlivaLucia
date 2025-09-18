import { Routes, Route } from "react-router-dom";
import NavBar from "./components/Navbar";
import Home from "./pages/Home";
import EventosPage from "./pages/EventosPage";
import EventoPage from "./pages/EventoPage";

function App() {
  return (
    <>
      <NavBar />
      <main className="app-main">
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/eventos" element={<EventosPage />} />
          <Route path="/eventos/:id" element={<EventoPage />} />
        </Routes>
      </main>
    </>
  );
}
export default App;
