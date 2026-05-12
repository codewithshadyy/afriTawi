const { DataTypes } = require("sequelize")
const sequelize = require("../config/db")

const User = sequelize.define("User", {

    email:{
        type:DataTypes.STRING,
        unique:true,
        allowNull:false
    },
    username:{
        type:DataTypes.STRING,
        unique:true,
        allowNull:true
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    status:{
        type:DataTypes.ENUM("verified", "unverified"),
        defaultValue:"unverified"
    },
    role:{
        type:DataTypes.ENUM("Buyer", "Seller", "Admin"),
        defaultValue:"Seller"
    }

})


module.exports = User

