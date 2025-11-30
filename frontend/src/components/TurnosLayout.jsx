import { useEffect, useState } from "react";
import { api } from "../services/api";
import TurnoForm from "./TurnoForm.jsx";
import TurnosFilters from "./TurnosFilters.jsx";
import TurnosTable from "./TurnosTable.jsx";

function TurnosLayout({ user, onLogout }) {
  const [turnos, setTurnos] = useState([]);
  const [filtros, setFiltros] = useState({
    fecha: "",
    nombre: "",
    siniestro: ""
  });
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  const cargarTurnos = async () => {
    setCargando(true);
    setError("");
    try {
      const data = await api.getTurnos(filtros);
      setTurnos(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarTurnos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtros]);

  const handleCrearTurno = async (nuevoTurno) => {
    await api.crearTurno(nuevoTurno);
    await cargarTurnos();
  };

  const handleCambiarEstado = async (id, estado) => {
    await api.actualizarEstado(id, estado);
    await cargarTurnos();
  };

  const handleEliminar = async (id) => {
    if (!window.confirm("¿Eliminar este turno?")) return;
    await api.eliminarTurno(id);
    await cargarTurnos();
  };

  return (
    <div>
      <header className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-0">Gestión de turnos</h2>
          <small className="text-muted">
            Sesión: {user.username} ({user.role})
          </small>
        </div>
        <button className="btn btn-outline-secondary btn-sm" onClick={onLogout}>
          Cerrar sesión
        </button>
      </header>

      <div className="row g-3 mb-4">
        <div className="col-12 col-lg-4">
          <TurnoForm onSubmit={handleCrearTurno} />
        </div>
        <div className="col-12 col-lg-8">
          <TurnosFilters filtros={filtros} setFiltros={setFiltros} />
          {error && <div className="alert alert-danger mt-2">{error}</div>}
          <TurnosTable
            turnos={turnos}
            cargando={cargando}
            onCambiarEstado={handleCambiarEstado}
            onEliminar={handleEliminar}
          />
        </div>
      </div>
    </div>
  );
}

export default TurnosLayout;
