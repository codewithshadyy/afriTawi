
const County = require("../models/County")
const {where, Op} = require("sequelize")

exports.createCounty = async (req,res) => {
    try {
       const {name, code} = req.body
       const countyExists = await County.findOne({
        where:{
            [Op.or]:[
                {name},
                {code}
            ]
        }
       })

       if(countyExists){
       return res.status(400).json({message:`Sorry ${name} already created`})
       }


       
       const county = await County.create({
        name,
        code:"0" +`${code}`
       })

      return res.status(201).json({
        message:`county ${county.name} created`,
        county
       })

        
    } catch (error) {

       return res.status(500).json({message:error.message})
        
    }
    
}

exports.editCounty = async (req,res) => {

    try {
         const {name, code} = req.body

         const county= await County.findByPk(req.params.id)

         if(!county){
           return res.status(404).json({message:"County not found"})
         }

         await county.update({
            name,
            code
         })
         await county.save()
       
        return res.status(200).json({
            success:true,
            data:county
            
         })

        
    } catch (error) {

        return res.status(500).json({message:error.message})
        
    }
    
}


exports.deleteCounty = async (req,res) => {

    try {
         const county = await County.findByPk(req.params.id)
         if(!county){
           return res.status(404).json({message:"county not found"})
         }

         await county.destroy()

        return res.json(204).json({
            success:true,
            message:`county ${county.name} deleted`
         })

         
       

        
    } catch (error) {

       return  res.status(500).json({
            success:false,
            message:error.message
        })
        
    }
    
}


exports.getCounty = async (req,res) => {

    try {
          const page = parseInt(req.query.page) || 1
          const limit = parseInt(req.query.limit) || 10

          const offset = (page - 1) * limit

          const {count, rows} = await County.findAndCountAll({
            limit,
            offset,
            order: [["createdAt", "DESC"]]
          })





         return  res.status(200).json({
            success: true,
            totalItems: count,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            data: rows
        })

        
    } catch (error) {

       return  res.status(500).json({
            success:false,
            message:error.message
        })
        
    }
    
}