const Tipos = require("../models/Tipos");

exports.GetTiposList = (req, res, next) => {
  Tipos.findAll()
    .then((result) => {
    
      const tipos = result.map((result) => result.dataValues);


      res.render("tipos/tipos-list", {
        pageTitle: "Tipos",
        tiposActive: true,
        tipos: tipos,
        hasTipos: tipos.length > 0,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.GetCreateTipos = (req, res, next) => {
  res.render("tipos/save-tipos", {
    pageTitle: "Create tipos",
    tiposActive: true,
    editMode: false,
  });
};

exports.PostCreateTipos = (req, res, next) => {
  const tipoName = req.body.Name;
  const description = req.body.Description;

  Tipos.create({ name: tipoName, description: description})
    .then((result) => {
      res.redirect("/tipos");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.GetEditTipos = (req, res, next) => {
  const edit = req.query.edit;
  const tipoId = req.params.tipoId

  if (!edit) {
    return res.redirect("/tipos");
  }

  Tipos.findOne({where: {id: tipoId}})
    .then((result) => {

        const tipo = result.dataValues;

        if(!tipo){
            return res.redirect("/tipos");
        }

        res.render("tipos/save-tipos", {
            pageTitle: "Editar tipos",
            tiposActive: true,
            editMode: edit,
            tipo: tipo,
        });
        
    })
    .catch((err) => {
        console.log(err);
    });

};

exports.PostEditTipos = (req, res, next) => {
    const tipoName = req.body.Name;
    const description = req.body.Description;
    const tipoId = req.body.tipoId ;

    Tipos.update({name: tipoName, description: description}, {where: {id: tipoId }})
    .then((result) => {

        return res.redirect("/tipos");
        
    })
    .catch((err) => {
        console.log(err);
    });
  
};

exports.PostDeleteTipos = (req, res, next) => {
    const tipoId = req.body.tipoId;

    Tipos.destroy({where:{id: tipoId}}) 
    .then((result) => {
        return res.redirect("/tipos"); 
    })
    .catch((err) => {
        console.log(err);
    });
};


  
