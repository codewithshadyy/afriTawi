

exports.sellersOnly = async (req,res,next) => {

   try {
     if(req.user && req.user.role === "Seller"){
        next()
    }
    
   } catch (error) {

    res.status(500).json({
        success:false,
        message:error.message
    })
    
   }
    
}