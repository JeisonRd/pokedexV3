const path = require("path");
const express = require("express");
const { engine } = require("express-handlebars");
const sequelize = require("./context/database");
const Pokemons = require("./models/Pokemones");
const Regiones = require("./models/Regiones");
const Tipos = require("./models/Tipos");
const port = process.env.PORT || 3000;

const errorController = require("./controller/ErrorController");

const app = express();

const compareHelpers = require("./util/helpers/hbs/compare")

app.engine(
    "hbs",
    engine({
      layoutsDir: "views/layouts",
      defaultLayout: "main-layout",
      extname: "hbs",
      helpers:{
        equalValue: compareHelpers.EqualValue,
      }
    })
  );

app.set("view engine", "hbs");
app.set("views", "views");

app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

const pokemonesRouter = require("./routes/pokemones");
const regionesRouter = require("./routes/regiones");
const tiposRouter = require("./routes/tipos");

app.use(pokemonesRouter);
app.use(regionesRouter);
app.use(tiposRouter);


app.use(errorController.Get404);

Pokemons.belongsTo(Regiones,{constraint: true,onDelete:"CASCADE"});
Regiones.hasMany(Pokemons);

Pokemons.belongsTo(Tipos,{constraint: true,onDelete:"CASCADE"});
Tipos.hasMany(Pokemons);


//models syncronization with the database
sequelize.sync().then( function(result){
  console.log("Sync operation succeded");

}).catch(error => {

  console.log(error)
})

app.listen(port, ()=> {
  console.log(`Application running on port ${port}`);
});


