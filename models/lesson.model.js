const { DataTypes } = require('sequelize');
const sequelize = require('./connection');

const Lessons = sequelize.define('Lessons', {
    name: {
        type: DataTypes.STRING 
    },
    image: {
        type: DataTypes.STRING 
    },
    sound: {
        type: DataTypes.STRING 
    },
    idtopic: {
        type: DataTypes.INTEGER 
    },
    idcreated: {
        type: DataTypes.INTEGER 
    },
    idshared: {
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
module.exports = Lessons;
