const { DataTypes } = require('sequelize');
const sequelize = require('./connection');

const Users = sequelize.define('Users', {
    username: {
        type: DataTypes.STRING 
    },
    password: {
        type: DataTypes.STRING 
    },
    email: {
        type: DataTypes.STRING 
    },
    birthday : {
        type: DataTypes.STRING 
    },
    roleid: {
        type: DataTypes.INTEGER
    },
    active: {
        type: DataTypes.TINYINT(1)
    },
    createdat: {
        type: DataTypes.INTEGER
    },
    updatedat: {
        type: DataTypes.INTEGER
    },
},{
    timestamps: false
}); 
module.exports = Users;
