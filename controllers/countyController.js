
const County = require("../models/County")
const {where, Op} = require("sequelize")

exports.createCounty = async (req,res) => {
    try {
       const {name} = req.body
       const countyExists = await County.findOne({
        where:{
            [Op.or]:[
                {name}
            ]
        }
       })

       if(countyExists){
        res.status(400).json({message:`Sorry ${name} already created`})
       }

       const county = await County.create({
        name
       })

       res.status(201).json({
        message:"county ${county.name} created",
        county
       })

        
    } catch (error) {

        res.status(500).json({message:error.message})
        
    }
    
}