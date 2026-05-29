const express = require("express");
const foodController = require("../controllers/food.controller.js");
const authMiddleware = require("../middlewares/auth.middleware.js");
const multer = require("multer");

const router = express.Router();

const upload = multer({
    storage: multer.memoryStorage()
});

router.post(
    "/",
    authMiddleware.authfoodmiddleware,
    upload.single("video"),
    foodController.createfood
);

router.get("/", foodController.getFoodItems);

router.post(
    "/like",
    authMiddleware.authAnyMiddleware,
    foodController.likefood
);

router.post(
    "/save",
    authMiddleware.authAnyMiddleware,
    foodController.saveFood
);

router.get(
    "/save",
    authMiddleware.authAnyMiddleware,
    foodController.getSaveFood
);

module.exports = router;