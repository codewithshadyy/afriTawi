const Product = require("../models/Product")
const User = require("../models/User")
const Category = require("../models/Category")
const uploadToCloudinary = require("../utils/uploadToCloudinary")

exports.createProduct = async (req,res) => {

    try {

        const {name, description, price, stock, category_id} = req.body
        const category = await Category.findByPk(category_id)

        if(!category){
            return res.status(404).json({
                success:false,
                message:"Invalid Category"
            })
        }

        let image_url = null
        let image_public_id = null

        if(req.file){
            const result= await uploadToCloudinary(req.file.buffer)
            image_url = result.secure_url
            image_public_id = result.public_id
        }

        const product  = await Product.create({
            name,
            description,
            price,
            stock,
            category_id,
            image_url,
            image_public_id,
            user_id:req.user.id



        })

        return res.status(201).json({
            success:true,
            data:product
        })









        
    } catch (error) {
        return res.status(500).json({message:error.message})
        
    }
    
}