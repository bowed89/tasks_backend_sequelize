var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require('cors');

require("dotenv").config();

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

const usuarioRoutes = require("./routes/usuario.routes");
const tareaRoutes = require("./routes/tarea.routes");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

app.use("/api", usuarioRoutes);
app.use("/api", tareaRoutes);

const PORT = process.env.PORT || 4000;
//const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));

module.exports = app;
