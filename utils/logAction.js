const AuditLog = require("../models/AuditLog")


exports.logAction = async ({
    user_id,
    action,
    entity,
    entity_id,
    details
}) => {

    try {

        await AuditLog.create({

        user_id,
        action,
        entity,
        entity_id,
        details

        })
        
    } catch (error) {

        console.log("Audit Log error", error.message)
        
    }
    
}