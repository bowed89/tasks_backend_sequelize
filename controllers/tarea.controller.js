const { Tarea } = require("../models");
const { Op } = require("sequelize");

exports.obtenerTareas = async (req, res) => {
  try {
    const tareas = await Tarea.findAll();
    res.json(tareas);
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error });
  }
};

exports.obtenerTareaPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const tarea = await Tarea.findByPk(id);

    if (!tarea) {
      return res.status(404).json({ message: "Tarea no encontrado" });
    }

    res.json(tarea);
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error });
  }
};

exports.crearTarea = async (req, res) => {
  try {
    const tarea = await Tarea.create(req.body);
    res.status(201).json(tarea);
  } catch ({ errors }) {
    res.status(500).json({ message: "Error al crear una tarea", errors });
  }
};

exports.actualizarTarea = async (req, res) => {
  try {
    const { id } = req.params;
    const tarea = await Tarea.findByPk(id);

    if (!tarea) {
      return res.status(404).json({ message: "Tarea no encontrado" });
    }

    const estadoActual = tarea.estado;
    const nuevoEstado = req.body.estado;

    console.log("estadoActual ===>", estadoActual);
    console.log("nuevoEstado ===>", nuevoEstado);

    // Validador estado Pendiente
    if (estadoActual === "Pendiente") {
      if (nuevoEstado === "En Progreso") {
        await tarea.update(req.body);
        return res.json({ message: "Tarea actualizada correctamente", tarea });
      } else {
        return res
          .status(404)
          .json({ message: "El Estado actual es 'PENDIENTE' y debe ser actualizado como 'EN PROGRESO'" });
      }
    }

    // Validador estado En Progreso
    if (estadoActual === "En Progreso") {
      if (nuevoEstado === "Completada") {
        await tarea.update(req.body);
        return res.json({ message: "Tarea actualizada correctamente", tarea });
      } else {
        return res
          .status(404)
          .json({ message: "El Estado actual es 'EN PROGRESO' y debe ser actualizado como 'COMPLETADA'" });
      }
    }

    // Validador estado En Completada
    if (estadoActual === "Completada") {
      return res.status(404).json({ message: "El Estado actual es 'COMPLETADA' y no es posible actualizar" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error });
  }
};

exports.eliminarTarea = async (req, res) => {
  try {
    const { id } = req.params;
    const tarea = await Tarea.findByPk(id);

    if (!tarea) {
      return res.status(404).json({ message: "Tarea no encontrado" });
    }

    const estadoActual = tarea.estado;

    if (estadoActual === "Completada") {
      await tarea.destroy();
      res.json({ message: "Tarea eliminada exitosamente" });
    } else {
      return res.status(404).json({ message: "No es posible eliminar la tarea porque el estado no es 'COMPLETADA'" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error });
  }
};

exports.filtrarPorEstado = async (req, res) => {
  try {
    const { status } = req.query;

    const filtro = {};
    if (status) {
      filtro.estado = status;
    }

    const tareas = await Tarea.findAll({
      where: filtro,
    });

    res.status(200).json(tareas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener las tareas" });
  }
};

exports.filtrarPorPalabra = async (req, res) => {
  try {
    const { search } = req.query;
    const where = {};

    if (search) {
      where[Op.or] = [{ titulo: { [Op.iLike]: `%${search}%` } }, { descripcion: { [Op.iLike]: `%${search}%` } }];
    }

    const tareas = await Tarea.findAll({ where });

    res.status(200).json(tareas);
  } catch (error) {
    console.error("Error al filtrar tareas:", error);
    res.status(500).json({ error: "Error al filtrar las tareas" });
  }
};
exports.filtrarPorFechas = async (req, res) => {
  try {
    const { fecha } = req.query;

    if (!fecha) {
      return res.status(400).json({ message: "Debe proporcionar una 'fecha'" });
    }

    const inicioDia = new Date(`${fecha}T00:00:00.000Z`);
    const finDia = new Date(`${fecha}T23:59:59.999Z`);

    const tareas = await Tarea.findAll({
      where: {
        fecha_limite: {
          [Op.between]: [inicioDia, finDia],
        },
      },
    });

    res.status(200).json(tareas);
  } catch (error) {
    console.error("Error al filtrar por fecha:", error);
    res.status(500).json({ error: "Error al filtrar las tareas por fecha" });
  }
};
