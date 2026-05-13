
const User = require("../models/User")
const {accessToken} = require("../utils/generateToken")
const bcrypt = require("bcrypt")


exports.signUp = async (req,res) => {

    try {

    const {email, username, password} = req.body

      const userExists = await User.findOne({
            where: {
                [Op.or]: [
                    { email },
                    { username }
                ]
            }
        })

    if(userExists){
        return res.status(400).json({
            message:"Email Exists or username already taken"
        })
    }
    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
        email,
        username,
        password:hashedPassword
    })

    const token = accessToken(user)


    res.status(201).json({
        success:true,
        id:user.id,
        message:`welcome ${user.username}`,
        role:user.role
    })
        
    } catch (error) {

        res.status(500).json({
            success:false,
            message:error.message,
           
        })
        
    }
    
}