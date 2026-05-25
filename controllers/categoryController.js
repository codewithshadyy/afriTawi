const Category = require("../models/Category")

const {where, Op} = require("sequelize")


exports.createCategory = async (req,res) => {

    try {
        const {name} = req.body 
        const categoryExists = await Category.findOne({
            where:{
                name
          
        }})

        if(categoryExists){
            res.status(400).json({message:"Category exists"})
        }
       const category = await Category.create({
        name
       })

       res.status(201).json({message:`Category ${category.name} created successfully`})
        
    } catch (error) {

        res.status(500).json({message:error.message})
        
    }
    
}

exports.listCategory = async (req,res) => {

    try {
          const page = parseInt(req.query.page) || 1
          const limit = parseInt(req.query.limit) || 10
          const offset= (page -1) * limit

          const category = await Category.findAndCountAll({
            limit,
            offset,
            order: [["createdAt", "DESC"]]
          })


          res.status(200).json({
            success:true,
            totalItems: count,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            data: rows

          })

        
    } catch (error) {

        res.status(500).json({message:error.message})
        
    }
    
}



