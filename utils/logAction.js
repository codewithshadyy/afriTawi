const AuditLog =
require("../models/AuditLog")



exports.logAction = async (data)=>{

   try{

      

      const log =
         await AuditLog.create(data)

      

   }catch(error){

     return resizeBy.status(500).json({
        success:false,
        error:error.message
     })

   }

}