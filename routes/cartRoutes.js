const controller =require("../controllers/cartController")
const express=require("express")
const email=require("../middleware/emailMiddleware")
const router=express.Router()
router.post("/add-to-cart",email.emailMiddleware,controller.addToCart)
module.exports=router