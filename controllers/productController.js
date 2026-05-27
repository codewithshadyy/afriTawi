const Product = require("../models/Product")
const User = require("../models/User")
const Profile =require("../models/Profile")
const Category = require("../models/Category")
const {uploadToCloudinary} = require("../utils/uploadToCloudinary")

const {where, Op} = require("sequelize")
const { County } = require("../models")

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


exports.getProducts = async (req,res) => {

    try {

        const {search,county,category, page=1, limit=10} = req.query

        const offset = (page-1) * limit


        const whereClause = {}

        if(search){
            whereClause.name = {
                [Op.iLike]:`%{search}%`
            }
        }

        if(category){
            whereClause.category_id = category
        }

       

 const products =
         await Product.findAndCountAll({

            where: whereClause,

            include:[

               {
                  model: User,

                  attributes:[
                     "id",
                     "username"
                  ],

                  include:[

                     {
                        model: Profile,

                        attributes:[
                           "avatar_url", "phone_number"
                        ],

                        include:[

                           {
                              model: County,

                              attributes:["name"],

                              where: county
                              ? {
                                 name:{
                                    [Op.iLike]:
                                    `%${county}%`
                                 }
                              }
                              : undefined

                           }

                        ]

                     }

                  ]

               },

               {
                  model: Category,

                  attributes:[
                     "id",
                     "name"
                  ]
               }

            ],

            limit: parseInt(limit),

            offset: parseInt(offset)

         })




      res.status(200).json({

         success:true,

         total: products.count,

         currentPage: parseInt(page),

         totalPages:
            Math.ceil(
               products.count / limit
            ),

         products: products.rows

      })

        
    } catch (error) {
        return res.status(500).json({
            success:false,
            error:error.message
        })
    }
    
}




exports.editProduct = async (req,res) => {

    try {

        const{name, description, price, stock, category_id} = req.body

        const product = await Product.findByPk(req.params.id)

        

    if(!product){
            return res.status(404).json({
                success:false,
                message:"product not found"
            })
        }



        if(product.user_id !==req.user.id){
            return res.status(403).json({
                success:false,
                messsage:"Can't delete this"
            })
        }
        
        let image_url = null
        let image_public_id = null
        if(req.file){
            const result = await uploadToCloudinary(req.file.buffer)
            image_url = result.secure_url
            image_public_id = result.public_id
        }

        await product.update({
            name,
             description, 
             price, 
             stock, 
             category_id,
             user_id:req.user.id,
             image_url,
             image_public_id

        })

        return res.status(200).json({
            success:true,
            message:"updated successfully",
            data:product
        })
        
    } catch (error) {

        return res.status(500).json({
            success:false,
            message:error.message
        })
        
    }
    
}




exports.deleteProduct = async (req,res) => {

    try {
      const product = await Product.findByPk(req.params.id)




       if(!product){
            return res.status(404).json({
                success:false,
                message:"Product not fond!!!"
            })
        }


      if(product.user_id != req.user.id){

        return res.status(403).json({
            success:false,
            message:"You have no ownership for this Product"
        })

    }

       

        await product.destroy()

        return res.status(200).json({
            success:true,
            message:"Product deleted sucessfuly"
        })

      



        
    } catch (error) {

        return res.status(500).jsin({
            success:false,
            message:error.message
        })
        
    }
    
}