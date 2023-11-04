const { DataTypes } = require('sequelize');
const sequelize = require('./connection');

const Categorys = sequelize.define('Categorys', {
    name: {
        type: DataTypes.STRING 
    },
    image: {
        type: DataTypes.STRING 
    },
    idcreated: {
        type: DataTypes.INTEGER 
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
module.exports = Categorys;
