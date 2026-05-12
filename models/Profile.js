const { DataTypes } = require("sequelize")
const sequelize = require("../config/db")

const Profile = sequelize.define("Profile", {

    phone_number: {
        type: DataTypes.STRING
    },

    bio: {
        type: DataTypes.TEXT
    },

    avatar_url: {
        type: DataTypes.TEXT
    }

})

module.exports = Profile