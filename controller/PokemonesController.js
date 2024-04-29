const Pokemones = require("../models/Pokemones");
const Regiones = require("../models/Regiones");
const Tipos = require("../models/Tipos");

exports.GetPokemonesList = (req, res, next) => {
  Pokemones.findAll({include:[{model: Regiones}, {model: Tipos}]})
    .then((result) => {
    
      const pokemones = result.map((result) => result.dataValues);

      res.render("pokemones/pokemones-list", {
        pageTitle: "Pokemones",
        homeActive: true,
        pokemones: pokemones,
        hasPokemones: pokemones.length > 0,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.GetCreatePokemones = (req, res, next) => {

    Regiones.findAll()
    .then((result) => {

      const regiones = result.map((result) => result.dataValues);

      Tipos.findAll()
        .then((result) => {
          const tipos = result.map((result) => result.dataValues);

          res.render("pokemones/save-pokemones", {
            pageTitle: "Create pokemones",
            homeActive: true,
            editMode: false,
            regiones: regiones,
            tipos: tipos,
            hasRegiones: regiones.length > 0,
            hasTipos: tipos.length > 0,
        });
        
        })
        .catch((err) => {
          console.log(err);
        });
        
      })
      .catch((err) => {
        console.log(err);
      });

};

exports.PostCreatePokemones = (req, res, next) => {
  const pokemonName = req.body.Name;
  const image = req.body.ImageUrl;
  const pokemonRegiones = req.body.Regiones;
  const pokemonTipos = req.body.Tipos;

  Pokemones.create({ name: pokemonName, image: image, regionId: pokemonRegiones, tipoId: pokemonTipos})
    .then((result) => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.GetEditPokemones = (req, res, next) => {
  const edit = req.query.edit;
  const pokemonId = req.params.pokemonId

  if (!edit) {
    return res.redirect("/");
  }

  Pokemones.findOne({where: {id: pokemonId},})
    .then((result) => {
        
        const pokemon = result.dataValues;

        if(!pokemon){
            return res.redirect("/");
        }

        Regiones.findAll()                   //////ojo//////
        .then((result) => {
        
        const regiones = result.map((result) => result.dataValues);

        Tipos.findAll()
        .then((result) => {
          const tipos = result.map((result) => result.dataValues);

          res.render("pokemones/save-pokemones", {
            pageTitle: "Editar pokemones",
            homeActive: true,
            editMode: edit,
            pokemon: pokemon,
            tipos:tipos,
            regiones: regiones,
            hasRegiones: regiones.length > 0,
            hasTipos: tipos.length > 0,
            });
        })
        .catch((err) => {
          console.log(err);
        });
      })
      .catch((err) => {
      console.log(err);
      });  
    })
    .catch((err) => {
    console.log(err);
  });      
};

exports.PostEditPokemones = (req, res, next) => {
    const pokemonName = req.body.Name;
    const image = req.body.ImageUrl;
    const pokemonRegiones = req.body.Regiones;
    const pokemonTipos = req.body.Tipos;
    const pokemonId = req.body.pokemonId ;

    Pokemones.update({name: pokemonName, image: image, regionId: pokemonRegiones, tipoId: pokemonTipos}, {where: {id: pokemonId }})
    .then((result) => {

        return res.redirect("/");
        
    })
    .catch((err) => {
        console.log(err);
    });
  
};

exports.PostPokemonesBySearch = (req, res, next) => {
  const search = req.body.Search;
  Pokemones.findAll({include:[{model: Regiones}, {model: Tipos}], where: {name: search}})
    .then((result) => {
    
      const pokemones = result.map((result) => result.dataValues);

      res.render("pokemones/pokemones-list", {
        pageTitle: "Pokemones",
        homeActive: true,
        pokemones: pokemones,
        hasPokemones: pokemones.length > 0,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.PostDeletePokemones = (req, res, next) => {
  const pokemonId = req.body.pokemonId;

  Pokemones.destroy({where:{id: pokemonId}}) 
  .then((result) => {
      console.log(pokemonId)
      return res.redirect("/"); 
  })
  .catch((err) => {
      console.log(err);
  });
};
