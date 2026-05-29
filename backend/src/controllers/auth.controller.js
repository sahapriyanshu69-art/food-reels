const userModel = require("../models/user.model.js");
const foodPartnerModel = require("../models/foodpartner.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

async function registerUser(req, res) {
    try {
        const { fullName, email, password } = req.body;

        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await userModel.create({
            fullName,
            email,
            password: hashedPassword
        });

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET
        );

        res.status(201).json({
            message: "User registered successfully",
            token,
            user
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

async function loginUser(req, res) {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }

        const valid = await bcrypt.compare(
            password,
            user.password
        );

        if (!valid) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET
        );

        res.status(200).json({
            message: "User logged in successfully",
            token,
            user
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

async function registerFoodPartner(req, res) {
    try {
        const {
            name,
            email,
            password,
            phoneNumber,
            address,
            contactName
        } = req.body;

        const existingPartner =
            await foodPartnerModel.findOne({ email });

        if (existingPartner) {
            return res.status(400).json({
                message: "Food partner already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const foodPartner =
            await foodPartnerModel.create({
                name,
                email,
                password: hashedPassword,
                phoneNumber,
                address,
                contactName
            });

        const token = jwt.sign(
            { id: foodPartner._id },
            process.env.JWT_SECRET
        );

        res.status(201).json({
            message: "Food partner registered successfully",
            token,
            foodPartner
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

async function loginFoodPartner(req, res) {
    try {
        const { email, password } = req.body;

        const foodPartner =
            await foodPartnerModel.findOne({ email });

        if (!foodPartner) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }

        const valid = await bcrypt.compare(
            password,
            foodPartner.password
        );

        if (!valid) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            { id: foodPartner._id },
            process.env.JWT_SECRET
        );

        res.status(200).json({
            message: "Food partner logged in successfully",
            token,
            foodPartner
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

module.exports = {
    registerUser,
    loginUser,
    registerFoodPartner,
    loginFoodPartner
};