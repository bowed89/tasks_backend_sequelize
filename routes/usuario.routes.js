const express = require("express");
const router = express.Router();
const { crearUsuario, loginUsuario } = require("../controllers/usuario.controller");

router.post("/auth/register", crearUsuario);
router.post("/auth/login", loginUsuario);

module.exports = router;
