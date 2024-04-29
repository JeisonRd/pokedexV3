const Sequelize = require("sequelize");

const port = process.env.PORT || 3306;
const sequelize = new Sequelize("pokedexV2", "root", "", {
  dialect: "mysql",
  host: "localhost",
  port: port,
});

module.exports = sequelize;