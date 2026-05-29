const foodPartnermodel = require("../models/foodpartner");
const userModel = require("../models/user.model.js");
const jwt = require("jsonwebtoken");

function getToken(req) {
    const authHeader = req.headers.authorization;

    if (!authHeader) return null;

    return authHeader.split(" ")[1];
}

async function authUserMiddleware(req, res, next) {
    const token = getToken(req);

    if (!token) {
        return res.status(401).json({
            message: "Please login first"
        });
    }

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        const user = await userModel.findById(decoded.id);

        if (!user) {
            return res.status(401).json({
                message: "User not found"
            });
        }

        req.user = user;
        next();

    } catch (err) {
        return res.status(401).json({
            message: "Invalid token"
        });
    }
}

async function authfoodmiddleware(req, res, next) {
    const token = getToken(req);

    if (!token) {
        return res.status(401).json({
            message: "Please login first"
        });
    }

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        const foodPartner =
            await foodPartnermodel.findById(decoded.id);

        if (!foodPartner) {
            return res.status(401).json({
                message: "Food partner not found"
            });
        }

        req.foodPartner = foodPartner;
        next();

    } catch (err) {
        return res.status(401).json({
            message: "Invalid token"
        });
    }
}

async function authAnyMiddleware(req, res, next) {
    const token = getToken(req);

    if (!token) {
        return res.status(401).json({
            message: "Please login first"
        });
    }

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        const user = await userModel.findById(decoded.id);

        if (user) {
            req.user = user;
            return next();
        }

        const foodPartner =
            await foodPartnermodel.findById(decoded.id);

        if (foodPartner) {
            req.foodPartner = foodPartner;
            return next();
        }

        return res.status(401).json({
            message: "Invalid token"
        });

    } catch (err) {
        return res.status(401).json({
            message: "Invalid token"
        });
    }
}

module.exports = {
    authUserMiddleware,
    authfoodmiddleware,
    authAnyMiddleware
};