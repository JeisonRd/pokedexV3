const Sequelize = require("sequelize");

const sequelize = require("../context/database");

const Regiones = sequelize.define("region", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false,
    },   
});

module.exports = Regiones;