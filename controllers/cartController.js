const Cart=require("../models/Cart")
const Product=require("../models/Product")
const User=require("../models/User")
exports.addToCart=async(req,res)=>{
    try{
        const userId=req.userId;
        const {productId,quantity}=req.body
        if(quantity<1){
            return res.status(400).json({msg:"please add a product"})
        }
        const productExists=await Product.findById(productId)
        if(!productExists){
            return res.status(400).json
({msg:"product not found"})       
 }
 let cart=await Cart.findOne({user:userId})
 if(!cart){
    cart=await Cart.create({
        user:userId,items:[{product:productId,quantity}]
    })
    return res.status(200).json({
        success:true,
        message:"cart created and product added",
        cart
    })
 }
 const itemIndex=cart.items.findIndex(
    item=>item.product.toString()===productId
 )
 //in above condition if no product is there it return -1 so we  check for that and update quantity
 if(itemIndex>-1){
    cart.items[itemIndex].quantity+=quantity
 }else{
    cart.items.pust({product:productId,quantity})
 }
await cart.save()
res.json({
     success:true,
        message:" product added successfully",
        
})
    }catch(error){
res.status(500).json({msg:error.message})
    }
}