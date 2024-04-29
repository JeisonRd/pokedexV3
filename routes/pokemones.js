const express = require("express");

const router = express.Router();

const pokemonesController = require("../controller/PokemonesController");

router.get("/", pokemonesController.GetPokemonesList);
router.get("/create-pokemones", pokemonesController.GetCreatePokemones);
router.post("/create-pokemones",pokemonesController.PostCreatePokemones);
router.get("/edit-pokemones/:pokemonId",pokemonesController.GetEditPokemones);
router.post("/edit-pokemones",pokemonesController.PostEditPokemones);
router.post("/delete-pokemones",pokemonesController.PostDeletePokemones);

router.post("/search", pokemonesController.PostPokemonesBySearch);



module.exports = router;