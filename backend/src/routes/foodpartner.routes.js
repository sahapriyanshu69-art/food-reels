const express = require('express');
const foodPartnerController =
    require("../controllers/food.controller.js");

const router = express.Router();

router.get(
    "/:id",
    foodPartnerController.getFoodPartnerById
);

module.exports = router;