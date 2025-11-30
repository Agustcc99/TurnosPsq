const ESTADO_COLORS = {
  comunicarse: "primary",
  avisado: "warning",
  asistio: "success",
  ausente: "danger"
};

function TurnosTable({ turnos, cargando, onCambiarEstado, onEliminar }) {
  const formatFecha = (isoString) => {
    const d = new Date(isoString);
    return d.toLocaleDateString();
  };

  if (cargando) {
    return (
      <div className="text-center py-3">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  if (!turnos.length) {
    return <div className="alert alert-info">No hay turnos para mostrar</div>;
  }

  return (
    <div className="table-responsive">
      <table className="table table-sm align-middle table-hover">
        <thead className="table-light">
          <tr>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Paciente</th>
            <th>Teléfono</th>
            <th>DNI</th>
            <th>Siniestro</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {turnos.map((t) => (
            <tr key={t._id}>
              <td>{formatFecha(t.fecha)}</td>
              <td>{t.hora}</td>
              <td>{t.paciente}</td>
              <td>{t.telefono}</td>
              <td>{t.dni}</td>
              <td>{t.siniestro}</td>
              <td>
                <span
                  className={`badge bg-${ESTADO_COLORS[t.estado] || "secondary"}`}
                >
                  {t.estado}
                </span>
              </td>
              <td>
                <div className="btn-group btn-group-sm mb-1" role="group">
                  <button
                    className="btn btn-primary"
                    onClick={() => onCambiarEstado(t._id, "comunicarse")}
                  >
                    Comunicarse
                  </button>
                  <button
                    className="btn btn-warning"
                    onClick={() => onCambiarEstado(t._id, "avisado")}
                  >
                    Avisado
                  </button>
                </div>
                <div className="btn-group btn-group-sm mb-1" role="group">
                  <button
                    className="btn btn-success"
                    onClick={() => onCambiarEstado(t._id, "asistio")}
                  >
                    Asistió
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => onCambiarEstado(t._id, "ausente")}
                  >
                    Ausente
                  </button>
                </div>
                <div>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => onEliminar(t._id)}
                  >
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TurnosTable;
