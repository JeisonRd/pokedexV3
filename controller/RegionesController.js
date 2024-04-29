const Regiones = require("../models/Regiones");

exports.GetRegionesList = (req, res, next) => {
  Regiones.findAll()
    .then((result) => {
    
      const regiones = result.map((result) => result.dataValues);


      res.render("regiones/regiones-list", {
        pageTitle: "Regiones",
        regionesActive: true,
        regiones: regiones,
        hasRegiones: regiones.length > 0,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.GetCreateRegiones = (req, res, next) => {
  res.render("regiones/save-regiones", {
    pageTitle: "Create regiones",
    regionesActive: true,
    editMode: false,
  });
};

exports.PostCreateRegiones = (req, res, next) => {
  const regionName = req.body.Name;
  const description = req.body.Description;

  Regiones.create({ name: regionName, description: description})
    .then((result) => {
      res.redirect("/regiones");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.GetEditRegiones = (req, res, next) => {
  const edit = req.query.edit;
  const regionId = req.params.regionId

  if (!edit) {
    return res.redirect("/regiones");
  }

  Regiones.findOne({where: {id: regionId}})
    .then((result) => {

        const region = result.dataValues;

        if(!region){
            return res.redirect("/regiones");
        }

        res.render("regiones/save-regiones", {
            pageTitle: "Editar regiones",
            regionesActive: true,
            editMode: edit,
            region: region,
        });
        
    })
    .catch((err) => {
        console.log(err);
    });

};

exports.PostEditRegiones = (req, res, next) => {
    const regionName = req.body.Name;
    const description = req.body.Description;
    const regionId = req.body.regionId ;

    Regiones.update({name: regionName, description: description}, {where: {id: regionId }})
    .then((result) => {

        return res.redirect("/regiones");
        
    })
    .catch((err) => {
        console.log(err);
    });
  
};

exports.PostDeleteRegiones = (req, res, next) => {
    const regionId = req.body.regionId;

    Regiones.destroy({where:{id: regionId}}) 
    .then((result) => {
        return res.redirect("/regiones"); 
    })
    .catch((err) => {
        console.log(err);
    });
};


  
