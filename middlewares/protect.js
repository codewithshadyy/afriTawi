const jwt = require("jsonwebtoken")


exports.protect = async (req,res,next) => {
    try {

        let token;
        if(req.headers.Authorization && req.headers.Authorization.startsWith["Bearer"]){
            token = 
        }

        
        
    } catch (error) {

         res.status(500).json({
        success:false,
        message:error.message
    })
        
    }
    
}