const { Usuario } = require("../models");
const { ValidationError } = require("sequelize");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("dotenv").config();

exports.crearUsuario = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    if (!password) {
      return res.status(400).json({ errores: ["La contraseña es obligatoria"] });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const nuevoUsuario = await Usuario.create({
      nombre,
      email,
      password: hashedPassword,
    });

    res.status(201).json(nuevoUsuario);
  } catch (error) {
    if (error instanceof ValidationError) {
      console.log("entra a error");

      const errores = error.errors.map((err) => err.message);
      return res.status(400).json({ errores });
    }

    // Otros errores
    console.error(error);
    res.status(500).json({ error: "Error al crear el usuario" });
  }
};

exports.loginUsuario = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email y contraseña son obligatorios" });
    }

    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) {
      return res.status(401).json({ error: "Email inexistente" });
    }

    const passwordValido = await bcrypt.compare(password, usuario.password);

    if (!passwordValido) {
      return res.status(401).json({ error: "Password incorrecto" });
    }

    // Generar token
    const token = jwt.sign({ id: usuario.id, email: usuario.email }, process.env.SEEDER, { expiresIn: "1h" });

    res.json({
      message: "Login exitoso",
      token,
      id: usuario.id
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error en el login" });
  }
};
