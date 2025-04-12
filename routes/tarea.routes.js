const express = require("express");
const router = express.Router();
const {
  obtenerTareas,
  crearTarea,
  obtenerTareaPorId,
  actualizarTarea,
  eliminarTarea,
  filtrarPorEstado,
  filtrarPorPalabra,
  filtrarPorFechas
} = require("../controllers/tarea.controller");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/tasks", authMiddleware, obtenerTareas);
router.get("/tasks/:id", authMiddleware, obtenerTareaPorId);
router.post("/tasks", authMiddleware, crearTarea);
router.put("/tasks/:id", authMiddleware, actualizarTarea);
router.delete("/tasks/:id", authMiddleware, eliminarTarea);

router.get("/task", authMiddleware, filtrarPorEstado);
router.get("/taskp", authMiddleware, filtrarPorPalabra);
router.get("/taskf", authMiddleware, filtrarPorFechas);

module.exports = router;
