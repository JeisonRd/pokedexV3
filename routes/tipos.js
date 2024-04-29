const express = require("express");

const router = express.Router();

const tiposController = require("../controller/TiposController");

router.get("/tipos", tiposController.GetTiposList);
router.get("/create-tipos", tiposController.GetCreateTipos);
router.post("/create-tipos", tiposController.PostCreateTipos);
router.get("/edit-tipos/:tipoId", tiposController.GetEditTipos);
router.post("/edit-tipos", tiposController.PostEditTipos);
router.post("/delete-tipos", tiposController.PostDeleteTipos);


module.exports = router;