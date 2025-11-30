import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import turnosRoutes from "./routes/turnosRoutes.js";

import path from "path";
import { fileURLToPath } from "url";

const app = express();

connectDB();

app.use(express.json());
app.use(cookieParser());


app.use("/api/auth", authRoutes);
app.use("/api/turnos", turnosRoutes);

// Rutas API
app.use("/api/auth", authRoutes);
app.use("/api/turnos", turnosRoutes);

// -----------------------------
// Servir frontend estático (React build)
// -----------------------------

// Resolver __dirname en módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Carpeta donde vamos a poner el build de React
const publicPath = path.join(__dirname, "public");

// Archivos estáticos
app.use(express.static(publicPath));

// Cualquier ruta que no sea /api/... devuelve index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});
// -----------------------------

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
