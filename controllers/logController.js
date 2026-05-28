
const AuditLog = require("../models/AuditLog")
const User = require("../models/User")

exports.getLogs = async (req,res) => {

    try {

        const logs = await AuditLog.findAll({
            include:[
                {
                    model:User,
                    attributes:["id", "username"]
                }
            ],

            order:[
                ["createdAt", "DESC"]
            ]
        })


        return res.status(200).json({
            success:true,
            data:logs
        })
        
    } catch (error) {

        return res.status(500).json({
            success:false,
            message:error.message
        })
        
    }
    
}