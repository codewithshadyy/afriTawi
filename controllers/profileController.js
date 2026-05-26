
const Profile = require("../models/Profile")
const County  = require("../models/County")


exports.CreateProfile = async (req,res) => {
    try {

    const { phone_number,bio,avatar_url,county_id} =req.body

    const County = await County.findByPk(county_id)

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

        res.sta(201).json({
            success:true,
            message:"Profile created successfully",
            profile
        })
        
    } catch (error) {

        res.status(500).json({message:error.message})
        
    }
    
} 