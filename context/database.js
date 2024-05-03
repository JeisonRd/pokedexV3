const Sequelize = require("sequelize");

const port = process.env.DB_PORT || 3306;
const host = process.env.DB_HOST || "localhost";
const user = process.env.USER || "root";
const password = process.env.PASSWORD || "";
const DB_NAME = process.env.DB_NAME || "pokedexV2";

console.log(host, port);

const sequelize = new Sequelize(DB_NAME, user, password, {
  dialect: "mysql",
  host: host,
  port: port,
});

module.exports = sequelize;