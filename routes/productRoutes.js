const controller=require("../controllers/productController")
const express=require("express");
const upload=require("../middleware/imageMiddleware")
const protected=require("../middleware/adminMiddleware")
const searchController = require("../controllers/searchController")


const router=express.Router()
router.post("/add-product",protected.adminMiddleware,
    upload.single("image"),controller.createProduct);
router.get("/show-products",controller.getProducts);
router.get("/search", searchController.searchProducts)


module.exports=router;
