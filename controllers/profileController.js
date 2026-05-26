
const Profile = require("../models/Profile")
const County  = require("../models/County")
const { User } = require("../models")
const{uploadToCloudinary} = require("../utils/uploadToCloudinary")


exports.createProfile = async (req,res) => {
    try {

    const { phone_number,bio,county_id} =req.body



    
   let avatar_url = null
    if(req.file){


         
        const result = await uploadToCloudinary(req.file.buffer)
        avatar_url = result.secure_url
        console.log(req.file)
    }

    const county = await County.findByPk(county_id)

    if(!county){
        return res.status(404).json({
            success:false,
            message:"County not found"
        })
    }

    const existingProfile = await Profile.findOne({
        where:{
            user_id:req.user.id
        }
    })

     if (existingProfile) {

            return res.status(400).json({

                success: false,

                message:
                  "Profile already exists"

            })

        }

        const profile = await Profile.create({
            phone_number,
            bio,
            avatar_url,
            county_id,
            user_id:req.user.id
        })

      return  res.status(201).json({
            success:true,
            message:"Profile created successfully",
            profile
        })
        
    } catch (error) {

       return res.status(500).json({message:error.message})
        
    }
    
} 


exports.listProfiles = async (req,res) => {

    try {

        const page = parseInt(req.params.page) || 1
        const limit = parseInt(req.params.limit) || 10
        const offset = (page -1) * limit

        const  {count, rows} = await Profile.findAndCountAll({
            limit,
            offset,
            order:[["createdAt", "DESC"]],

        

            include:[
                {

                model:User,
                attributes:["id", "username","email" ]
                },

             {
                model:County,
                attributes:["id", "name", "code"]
             }
        ],
            attributes:{
                exclude:["user_id", "county_id"]
            }
        })

       return res.status(200).json({

            success:true,
            totalItems:count,
            totalPages:Math.ceil(count / limit),
            currentPage:page,
            data:rows
        })



        
    } catch (error) {

       return res.status(500).json({
            success:false,
            message:error.message
        })
        
    }
    
}


exports.findProfileById = async (req,res) => {

    try {
           const profile = await Profile.findByPk(req.params.id)

           if(!profile){
           return  res.status(404).json({
                success:false,
                message:"Profile not  found"
            })
           }

           

           return res.status(200).json({
            success:true,
            profile
            
           })
        
        
    } catch (error) {

       return res.status(500).json({message:error.message})
        
    }
    
}


exports.editProfile = async (req,res) => {

    try {

        const {phone_number,bio,county_id} = req.body
        const profile = await Profile.findByPk(req.params.id)

        
        
        if(!profile){
           return res.status(404).json({message:"Profile not found!!!"})
        }

        if(profile.user_id != req.user.id){
            return res.status(403).json({message:"Cannot edit profile"})
        }
        
         let avatar_url = null
        if(req.file){
           
            const result = await uploadToCloudinary(req.file.buffer)
            avatar_url = result.secure_url
        }
        await profile.update({
            phone_number,
            bio,
            avatar_url,
            county_id
        })

         profile.save()

       return res.status(200).json({
            success:true,
            message:"Profile updated successfully",
            data:profile
        })
        
    } catch (error) {

        return res.status(500).json({error:error.message})
        
    }
    
}


exports.deleteProfile = async (req,res) => {

    try {
        const profile = await Profile.findByPk(req.params.id)

        if(!profile){
           return res.status(404).json({message:"Profile not found"})
        }

        if(profile.user_id !==req.user.id){
            return res.status(403).json({message:"Can't delete Profile??"})
        }

        await profile.destroy()
        return res.status(200).json({message:"Profile deleted sucessfully"})
        
    } catch (error) {

        return res.status(500).json({message:error.message})
        
    }
    
}