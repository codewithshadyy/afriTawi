
const Profile = require("../models/Profile")
const County  = require("../models/County")
const { User } = require("../models")


exports.createProfile = async (req,res) => {
    try {

    const { phone_number,bio,avatar_url,county_id} =req.body

    const county = await County.findByPk(county_id)

    if(!County){
        res.status(404).json({
            success:false,
            message:"County not found"
        })
    }

    const ExistingProfile = await Profile.findOne({
        where:{
            user_id:req.user.id
        }
    })

     if (ExistingProfile) {

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

        res.status(201).json({
            success:true,
            message:"Profile created successfully",
            profile
        })
        
    } catch (error) {

        res.status(500).json({message:error.message})
        
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

        res.status(200).json({

            success:true,
            totalItems:count,
            totalPages:Math.ceil(count / limit),
            currentPage:page,
            data:rows
        })



        
    } catch (error) {

        res.status(500).json({
            success:false,
            message:error.message
        })
        
    }
    
}


exports.findProfileById = async (req,res) => {

    try {
           const profile = await Profile.findByPk(req.params.id)

           if(!profile){
            res.status(404).json({
                success:false,
                message:"Profile not  found"
            })
           }

           

           res.status(200).json({
            success:true,
            profile
            
           })
        
        
    } catch (error) {

        res.status(500).json({message:error.message})
        
    }
    
}


exports.editProfile = async (req,res) => {

    try {

        const {phone_number,bio,avatar_url,county_id} = req.body
        const profile = await Profile.findByPk(req.params.id)
        
        if(!profile){
            res.status(404).json({message:"Profile not found!!!"})
        }

        if(profile.user_id != req.user.id){
            res.status(403).json({message:"Cannot edit profile"})
        }

        await profile.update({
            phone_number,
            bio,
            avatar_url,
            county_id
        })

       await  profile.save()

        res.status(200).json({
            success:true,
            message:"Profile updated successfully",
            data:profile
        })
        
    } catch (error) {

        res.status(500).json({error:error.message})
        
    }
    
}