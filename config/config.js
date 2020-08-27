require("dotenv").config();

module.exports = {
  development: {
    username: "root",
    password: process.env.password,
    database: "express_tennis",
    host: "localhost",
    dialect: "mysql"
  },
  test: {
    username: "root",
    password: process.env.password,
    database: "express_tennis",
    host: "localhost",
    dialect: "mysql",
    logging: false
  },
  production: {
    use_env_variable: "JAWSDB_URL",
    dialect: "mysql"
  }
};