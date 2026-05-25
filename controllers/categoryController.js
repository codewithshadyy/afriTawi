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



