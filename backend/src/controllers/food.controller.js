const foodModel = require('../models/food.model.js');
const storageService = require('../services/storage.service.js');
const likeModel = require('../models/likes.model.js');
const saveModel = require('../models/save.model.js');
const { v4: uuid } = require("uuid");

async function createfood(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: "Video is required"
            });
        }

        const fileUploadResult = await storageService.uploadFile(
            req.file.buffer,
            uuid()
        );

        const foodItem = await foodModel.create({
            name: req.body.name,
            description: req.body.description,
            video: fileUploadResult.url,
            foodPartner: req.foodPartner._id
        });

        res.status(201).json({
            message: "Food created successfully",
            food: foodItem
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

async function getFoodItems(req, res) {
    try {
        const foodItems = await foodModel.find({});

        res.status(200).json({
            message: "Food items fetched successfully",
            foodItems
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

async function getFoodPartnerById(req, res) {
    try {
        const { id } = req.params;

        const foodPartner = await require("../models/foodpartner")
            .findById(id);

        const foodItems = await foodModel.find({
            foodPartner: id
        });

        res.status(200).json({
            foodPartner: {
                  _id: foodPartner._id,
        name: foodPartner.name,
        address: foodPartner.address,
        phoneNumber: foodPartner.phoneNumber,
        totalMeals: foodItems.length,
        customersServed: 0,
        foodItems
            }
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

async function likefood(req, res) {
    try {
        const { foodId } = req.body;
        const user = req.user||req.foodPartner;

        const isAlreadyLiked = await likeModel.findOne({
            user: user._id,
            food: foodId
        });

        if (isAlreadyLiked) {
            await likeModel.deleteOne({
                user: user._id,
                food: foodId
            });

            await foodModel.findByIdAndUpdate(foodId, {
                $inc: { likeCount: -1 }
            });

            return res.status(200).json({
                like: false,
                message: "Food unliked successfully"
            });
        }

        await likeModel.create({
            user: user._id,
            food: foodId
        });

        await foodModel.findByIdAndUpdate(foodId, {
            $inc: { likeCount: 1 }
        });

        res.status(201).json({
            like: true,
            message: "Food liked successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

async function saveFood(req, res) {
    try {
        const { foodId } = req.body;
        const user = req.user || req.foodPartner;

        const isAlreadySaved = await saveModel.findOne({
            user: user._id,
            food: foodId
        });

        if (isAlreadySaved) {
            await saveModel.deleteOne({
                user: user._id,
                food: foodId
            });

            await foodModel.findByIdAndUpdate(foodId, {
                $inc: { savesCount: -1 }
            });

            return res.status(200).json({
                save: false
            });
        }

        await saveModel.create({
            user: user._id,
            food: foodId
        });

        await foodModel.findByIdAndUpdate(foodId, {
            $inc: { savesCount: 1 }
        });

        res.status(200).json({
            save: true
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

async function getSaveFood(req, res) {
    try {
        const user = req.user || req.foodPartner;

        const saveFoods = await saveModel
            .find({ user: user._id })
            .populate("food");

        if (!saveFoods || saveFoods.length === 0) {
            return res.status(404).json({
                message: "No saved food found"
            });
        }

        res.status(200).json({
            message: "Saved food retrieved successfully",
            saveFoods
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}


module.exports = {
    createfood,
    getFoodItems,
    getFoodPartnerById,
    likefood,
    saveFood,
    getSaveFood
};