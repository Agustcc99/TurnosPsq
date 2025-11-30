import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin"],
      default: "admin"
    }
  },
  { timestamps: true }
);

export const Usuario = mongoose.model("Usuario", usuarioSchema);
