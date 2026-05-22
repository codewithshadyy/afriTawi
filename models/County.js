

const {DataTypes} = require("sequelize")
const sequelize = require("../config/db")

const County = sequelize.define("County", {
     name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    code:{
        type:DataTypes.INTEGER,
        unique:true,
        allowNull:true
    }
})


module.exports = County