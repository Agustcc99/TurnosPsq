import express from "express";
import {
  crearTurno,
  listarTurnos,
  actualizarEstado,
  eliminarTurno
} from "../controllers/turnosController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(requireAuth);

router.get("/", listarTurnos);
router.post("/", crearTurno);
router.patch("/:id/estado", actualizarEstado);
router.delete("/:id", eliminarTurno);

export default router;
