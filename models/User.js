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
    },


    refresh_token: {
    type: DataTypes.TEXT
},

reset_password_token: {
    type: DataTypes.STRING
},

reset_password_expires: {
    type: DataTypes.DATE
},
    verification_token: {
    type: DataTypes.STRING
},

verification_token_expires: {
    type: DataTypes.DATE
}

})


module.exports = User

