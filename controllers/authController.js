const crypto = require("crypto")
const User = require("../models/User")
const {sendEmail} = require("../utils/sendEmail")
const { accessToken,generateRefreshToken } = require("../utils/generateToken")
const bcrypt = require("bcrypt")
const { Op, where } = require("sequelize")


exports.signUp = async (req,res) => {

    try {

    const {email, username,role, password} = req.body

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
        role,
        password:hashedPassword
    })

    const verificationToken = crypto
    .randomBytes(32)
    .toString("hex")



    user.verification_token = verificationToken

    user.verification_token_expires =
    Date.now() + 1000 * 60 * 60


    await user.save()


    const verificationURL =`http://localhost:4545/api/v1/users/verify/${verificationToken}`

    await sendEmail(

    user.email,

    "Verify Your Account",

    `
        <h2>Email Verification</h2>

        <p>Click below to verify your account:</p>

        <a href="${verificationURL}">
            Verify Account
        </a>
    `
)


   


    res.status(201).json({

    success:true,

    message:"Account created. Please verify your email."

})
        
    } catch (error) {

        res.status(500).json({
            success:false,
            message:error.message,
           
        })
        
    }
    
}


exports.verifyEmail = async(req,res) =>{
    try {

        const {token} =req.params
        const user = await User.findOne({
            where:{

                verification_token: token
            }
        })

        if(!user){

            return res.status(400).json({

                success:false,

                message:"Invalid token"

            })
        }

           if (
            user.verification_token_expires <
            Date.now()
        ) {

            return res.status(400).json({

                success:false,

                message:"Token expired"

            })

        }

        user.status = "verified"

        user.verification_token = null

        user.verification_token_expires = null



        await user.save()



        res.status(200).json({

            success:true,

            message:"Email verified successfully"

        })

        
    } catch (error) {

        res.status(500).json({
            success:false,
            message:error.message
        }
        )
        
    }
}



exports.signIn = async (req,res) => {
    try {
        const {username, password} = req.body
        const user = await User.findOne({where:{username}})

        if(!user){
            res.status(404).json({
                success:false,
                message:"Username not found!!!"
            })
        }
        if(user.status !== "verified"){

    return res.status(401).json({

        success:false,

        message:"Please verify your email"

    })

}

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            res.status(401).json({
                message:"Invalid Credentials"
            })




        }


        const token = accessToken(user)
        const refreshToken = generateRefreshToken(user)

        res.status(200).json({
            message: `welcome back ${user.username}`,
            token,
            refreshToken
        })

        


        



        
    } catch (error) {

          res.status(500).json({
            success:false,
            message:error.message,
           
        })
        

        
    }
    
}