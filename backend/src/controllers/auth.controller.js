const userModel= require("../models/user.model.js");
const foodPartnerModel=require("../models/foodpartner.js");
const jwt=require('jsonwebtoken')
const bcrypt = require("bcryptjs");

async function registerUser(req,res){
    const{fullName,email,password} = req.body;

    const isUserAlreadyExists=await userModel.findOne({
        email
    })

    if(isUserAlreadyExists){
        return res.status(400).json({
            message:"user already exista"
        })
    }

    const hashedPassword=await bcrypt.hash(password,10);

    const user=await userModel.create({
        fullName,
        email,
        password:hashedPassword
    })

    const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
    res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000
    })

    res.status(201).json({
        message:"user rgistered successfully",
        user:{
            _id:user._id,
            email:user.email,
            fullName:user.fullName
        }
    })
}

async function loginUser(req,res){
    const {email,password}= req.body;
    const user=await userModel.findOne({
        email
    })

    if(!user){
        return res.status(400).json({
            message:"invalid email or password"
        })
    }
    const isPasswordValid=await bcrypt.compare(password,user.password)

    if(!isPasswordValid){
        return res.status(400).json({
            message:"invalid email or password "
        })
    }
    
    const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
    res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000
    })

    res.status(200).json({
        message:"user logged in successfully",
        user:{
             _id:user._id,
            email:user.email,
            fullName:user.fullName
        }
    })
}

function logoutUser(req,res){
    res.clearCookie("token");
    res.status(200).json({
        message:"User logged out"
    });
}

async function registerFoodPartner(req,res){
    const {name,email,password,phoneNumber,address,contactname}=req.body;

    const isAccountAlreadyExists=await foodPartnerModel.findOne({
        email
    })
    if(isAccountAlreadyExists){
        return res.status(400).json({
            message:"food partner account already exists"
        })
    }
    const hashedPassword=await bcrypt.hash(password,10);
    const foodPartner=await foodPartnerModel.create({
        name,
        email,
        password:hashedPassword,
        phoneNumber,
        address,
        contactname
    })

    const token=jwt.sign({id:foodPartner._id},process.env.JWT_SECRET)
    res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000
    })

    res.status(201).json({
        message:"food partner register successfully",
        foodPartner:{
            _id:foodPartner._id,
            email:foodPartner.email,
            name:foodPartner.name,
            address:foodPartner.address,
            contactname:foodPartner.contactname,
            phone:foodPartner.phoneNumber
        }
    })
}

async function loginFoodPartner(req, res) {
    const { email, password } = req.body;

    const foodPartner = await foodPartnerModel.findOne({
        email
    })

    if (!foodPartner) {
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, foodPartner.password);

    if (!isPasswordValid) {
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

    const token = jwt.sign({id: foodPartner._id}, process.env.JWT_SECRET)
    res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000
    })

    res.status(200).json({
        message: "Food partner logged in successfully",
        foodPartner: {
            _id: foodPartner._id,
            email: foodPartner.email,
            name: foodPartner.name
        }
    })
}

function logoutFoodPartner(req, res) {
    res.clearCookie("token");
    res.status(200).json({
        message: "Food partner logged out successfully"
    });
}

module.exports={
    registerUser,
    loginUser,
    logoutUser,
    registerFoodPartner,
    loginFoodPartner,
    logoutFoodPartner
}