const User = require("../models/User")
const jwt = require("jsonwebtoken")


exports.accessToken = async (user) => {

    return jwt.sign(
        {
            id:user.id, 
            role:user.role
        }, 

        process.env.JWT_SECRET,

         {expiresIn:"15m"}
        
        
        )
    
    
   
    
}



exports.generateRefreshToken = (user) => {

    return jwt.sign(
        {
            id: user.id,
            role:user.role
        },

        process.env.JWT_REFRESH_SECRET,

        {
            expiresIn: "7d"
        }
    )
}
