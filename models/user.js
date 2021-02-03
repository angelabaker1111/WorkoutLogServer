const sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        passwordhash: {                //this is different from journal showed password
            type: DataTypes.STRING,
            allowNull: false,
        },

    });
    return User;
};