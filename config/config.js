require("dotenv").config();

/* module.exports = {
  development: {
    username: process.env.DB_USERNAME_DEV,
    password: process.env.DB_PASSWORD_DEV,
    database: process.env.DB_NAME_DEV,
    host: process.env.DB_HOST_DEV,
    dialect: process.env.DB_DIALECT_DEV,
  },
  test: {
    username: process.env.DB_USERNAME_TEST,
    password: process.env.DB_PASSWORD_TEST,
    database: process.env.DB_NAME_TEST,
    host: process.env.DB_HOST_TEST,
    dialect: process.env.DB_DIALECT_TEST,
  },
  production: {
    username: process.env.DB_USERNAME_PROD,
    password: process.env.DB_PASSWORD_PROD,
    database: process.env.DB_NAME_PROD,
    host: process.env.DB_HOST_PROD,
    dialect: process.env.DB_DIALECT_PROD,
  },
};
 */

/* module.exports = {
  development: {
    url: process.env.DATABASE_URL,
    dialect: "postgres",
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // necesario para Render
      },
    },
  },
};
 */

module.exports = {
  production: {
    username: "tareas_db_c8au_user", // Usuario de tu base de datos en Render
    password: "5slSGQZYscRm0hNy8VhLG1423VDSgnLk", // Contraseña de tu base de datos en Render
    database: "tareas_db_c8au", // Nombre de la base de datos
    host: "dpg-cvsve1pr0fns73ds2glg-a.oregon-postgres.render.com", // Host de la base de datos
    dialect: "postgres", // Esto es importante
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // Necesario para Render
      },
    },
  },
};

