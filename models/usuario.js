"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    static associate(models) {
      Usuario.hasMany(models.Tarea, {
        foreignKey: "usuarioId",
        as: "tarea",
      });
    }
  }

  Usuario.init(
    {
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,

      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "El correo ya está en uso",
        },
        validate: {
          isEmail: {
            msg: "Debe ser un correo electrónico válido",
          },
          notEmpty: {
            msg: "El correo es obligatorio",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "La contraseña es obligatoria",
          },
          len: {
            args: [6, 100],
            msg: "La contraseña debe tener al menos 6 caracteres",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Usuario",
    }
  );

  return Usuario;
};
