function TurnosFilters({ filtros, setFiltros }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFiltros((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="card card-body shadow-sm mb-3">
      <h5 className="mb-3">Filtros</h5>
      <div className="row g-2">
        <div className="col-12 col-md-4">
          <label className="form-label">Fecha</label>
          <input
            type="date"
            name="fecha"
            className="form-control"
            value={filtros.fecha}
            onChange={handleChange}
          />
        </div>
        <div className="col-12 col-md-4">
          <label className="form-label">Paciente</label>
          <input
            name="nombre"
            className="form-control"
            placeholder="Buscar por nombre"
            value={filtros.nombre}
            onChange={handleChange}
          />
        </div>
        <div className="col-12 col-md-4">
          <label className="form-label">Siniestro</label>
          <input
            name="siniestro"
            className="form-control"
            placeholder="N° siniestro"
            value={filtros.siniestro}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
}

export default TurnosFilters;
