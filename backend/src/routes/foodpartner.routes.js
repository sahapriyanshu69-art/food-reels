const express=require('express');
const foodPartnerController=require("../controllers/food.controller.js");
const authMiddleware=require("../middlewares/auth.middleware.js").default;
const router=express.Router();

router.get("/:id",
    
    foodPartnerController.getFoodPartnerById
)



module.exports=router;