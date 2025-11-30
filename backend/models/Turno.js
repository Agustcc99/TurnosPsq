import mongoose from "mongoose";

const turnoSchema = new mongoose.Schema(
  {
    paciente: { type: String, required: true },
    telefono: { type: String, required: true },
    dni: { type: String },
    siniestro: { type: String },
    fecha: { type: Date, required: true },
    hora: { type: String, required: true },
    estado: {
      type: String,
      enum: ["comunicarse", "avisado", "asistio", "ausente"],
      default: "comunicarse"
    }
  },
  { timestamps: true }
);

turnoSchema.index({ fecha: 1, hora: 1 });

export const Turno = mongoose.model("Turno", turnoSchema);
