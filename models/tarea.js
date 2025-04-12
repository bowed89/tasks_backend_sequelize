"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Tarea extends Model {
    static associate(models) {
      // Una tarea pertenece a un usuario
      Tarea.belongsTo(models.Usuario, {
        foreignKey: "usuarioId",
        as: "usuario",
      });
    }
  }
  Tarea.init(
    {
      titulo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "El título es obligatorio",
          },
        },
      },
      descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "La descripción es obligatoria",
          },
        },
      },
      estado: {
        type: DataTypes.STRING,
        allowNull: true,

      },
      fecha_limite: {
        type: DataTypes.DATE,
        allowNull: true,
        validate: {
          isDate: {
            msg: "La fecha límite debe ser una fecha válida",
          },
        },
      },
      usuarioId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "El usuarioId es obligatorio",
          },
          isInt: {
            msg: "El usuarioId debe ser un número entero",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Tarea",
    }
  );

  return Tarea;
};
