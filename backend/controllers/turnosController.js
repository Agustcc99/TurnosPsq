import { Turno } from "../models/Turno.js";

export const crearTurno = async (req, res) => {
  try {
    const { paciente, telefono, dni, siniestro, fecha, hora, estado } =
      req.body;

    if (!paciente || !telefono || !fecha || !hora) {
      return res.status(400).json({
        message: "paciente, telefono, fecha y hora son obligatorios"
      });
    }

    const turno = await Turno.create({
      paciente,
      telefono,
      dni,
      siniestro,
      fecha,
      hora,
      estado: estado || "comunicarse"
    });

    return res.status(201).json(turno);
  } catch (error) {
    console.error("Error al crear turno:", error);
    return res.status(500).json({ message: "Error interno al crear turno" });
  }
};

export const listarTurnos = async (req, res) => {
  try {
    const { fecha, nombre, siniestro } = req.query;

    const filtro = {};

    if (fecha) {
      const start = new Date(fecha);
      const end = new Date(fecha);
      end.setDate(end.getDate() + 1);
      filtro.fecha = { $gte: start, $lt: end };
    }

    if (nombre) {
      filtro.paciente = { $regex: nombre, $options: "i" };
    }

    if (siniestro) {
      filtro.siniestro = { $regex: siniestro, $options: "i" };
    }

    const turnos = await Turno.find(filtro).sort({ fecha: 1, hora: 1 });

    // 🔹 Convertimos la fecha a string "YYYY-MM-DD" para evitar líos de timezone
    const turnosLimpios = turnos.map((t) => {
      const obj = t.toObject();

      if (obj.fecha instanceof Date) {
        // toISOString() siempre es UTC → mantiene el día pedido en el input
        obj.fecha = obj.fecha.toISOString().slice(0, 10); // "2025-12-03"
      }

      return obj;
    });

    return res.json(turnosLimpios);
  } catch (error) {
    console.error("Error al listar turnos:", error);
    return res.status(500).json({ message: "Error interno al listar turnos" });
  }
};


export const actualizarEstado = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;

    if (!estado) {
      return res.status(400).json({ message: "estado es obligatorio" });
    }

    const turno = await Turno.findByIdAndUpdate(
      id,
      { estado },
      { new: true }
    );

    if (!turno) {
      return res.status(404).json({ message: "Turno no encontrado" });
    }

    return res.json(turno);
  } catch (error) {
    console.error("Error al actualizar estado:", error);
    return res.status(500).json({ message: "Error interno al actualizar" });
  }
};

export const eliminarTurno = async (req, res) => {
  try {
    const { id } = req.params;

    const turno = await Turno.findByIdAndDelete(id);

    if (!turno) {
      return res.status(404).json({ message: "Turno no encontrado" });
    }

    return res.json({ message: "Turno eliminado" });
  } catch (error) {
    console.error("Error al eliminar turno:", error);
    return res.status(500).json({ message: "Error interno al eliminar" });
  }
};
