const AuditLog =
require("../models/AuditLog")



exports.logAction = async (data)=>{

   try{

      console.log("TRYING TO LOG:", data)

      const log =
         await AuditLog.create(data)

      console.log("LOG SUCCESS:", log.id)

   }catch(error){

      console.log(
         "AUDIT LOG ERROR:"
      )

      console.log(error)

   }

}