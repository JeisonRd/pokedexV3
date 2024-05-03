const Sequelize = require("sequelize");

const port = process.env.PORT || 3306;
const host = process.env.DB_HOST || "localhost";
const user = process.env.USER || "root";
const password = process.env.PASSWORD || "";
const DB_NAME = process.env.DB_NAME || "pokedexV2";

const sequelize = new Sequelize(DB_NAME, user, password, {
  dialect: "mysql",
  host: host,
  port: port,
});

module.exports = sequelize;