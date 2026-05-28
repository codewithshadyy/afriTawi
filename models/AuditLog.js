const {DataTypes} = require("sequelize")

const sequelize = require("../config/db")

const AuditLog = sequelize.define("AuditLog", {
    action:{
        type:DataTypes.STRING,
        allowNull:false
    },
    entity:{
        type:DataTypes.STRING
    },
    entity_id:{
        type:DataTypes.INTEGER
    },

    details:{
        type:DataTypes.TEXT
    }
})


module.exports =AuditLog