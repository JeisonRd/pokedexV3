const express = require("express");

const router = express.Router();

const regionesController = require("../controller/RegionesController");

router.get("/regiones", regionesController.GetRegionesList);
router.get("/create-regiones", regionesController.GetCreateRegiones);
router.post("/create-regiones", regionesController.PostCreateRegiones);
router.get("/edit-regiones/:regionId", regionesController.GetEditRegiones);
router.post("/edit-regiones", regionesController.PostEditRegiones);
router.post("/delete-regiones", regionesController.PostDeleteRegiones);


module.exports = router;