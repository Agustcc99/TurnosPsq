import { useState } from "react";

const ESTADOS = ["comunicarse", "avisado", "asistio", "ausente"];

function TurnoForm({ onSubmit }) {
  const [form, setForm] = useState({
    paciente: "",
    telefono: "",
    dni: "",
    siniestro: "",
    fecha: "",
    hora: "",
    estado: "comunicarse"
  });

  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (!form.paciente || !form.telefono || !form.fecha || !form.hora) {
        setError("Paciente, teléfono, fecha y hora son obligatorios");
        return;
      }

      setCargando(true);
      await onSubmit({
        ...form,
        fecha: form.fecha
      });
      setForm({
        paciente: "",
        telefono: "",
        dni: "",
        siniestro: "",
        fecha: "",
        hora: "",
        estado: "comunicarse"
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card card-body shadow-sm">
      <h5 className="mb-3">Nuevo turno</h5>

      <div className="mb-2">
        <label className="form-label">Paciente *</label>
        <input
          name="paciente"
          className="form-control"
          value={form.paciente}
          onChange={handleChange}
        />
      </div>

      <div className="mb-2">
        <label className="form-label">Teléfono *</label>
        <input
          name="telefono"
          className="form-control"
          value={form.telefono}
          onChange={handleChange}
        />
      </div>

      <div className="mb-2">
        <label className="form-label">DNI</label>
        <input
          name="dni"
          className="form-control"
          value={form.dni}
          onChange={handleChange}
        />
      </div>

      <div className="mb-2">
        <label className="form-label">Siniestro</label>
        <input
          name="siniestro"
          className="form-control"
          value={form.siniestro}
          onChange={handleChange}
        />
      </div>

      <div className="mb-2 row">
        <div className="col-6">
          <label className="form-label">Fecha *</label>
          <input
            type="date"
            name="fecha"
            className="form-control"
            value={form.fecha}
            onChange={handleChange}
          />
        </div>
        <div className="col-6">
          <label className="form-label">Hora *</label>
          <input
            type="time"
            name="hora"
            className="form-control"
            value={form.hora}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="mb-2">
        <label className="form-label">Estado inicial</label>
        <select
          name="estado"
          className="form-select"
          value={form.estado}
          onChange={handleChange}
        >
          {ESTADOS.map((e) => (
            <option key={e} value={e}>
              {e}
            </option>
          ))}
        </select>
      </div>

      {error && <div className="alert alert-danger py-1">{error}</div>}

      <button
        type="submit"
        className="btn btn-success w-100 mt-2"
        disabled={cargando}
      >
        {cargando ? "Guardando..." : "Guardar turno"}
      </button>
    </form>
  );
}

export default TurnoForm;
