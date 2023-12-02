const { DataTypes } = require('sequelize');
const sequelize = require('./connection');

const Quizs = sequelize.define('Quizs', {
    name: {
        type: DataTypes.STRING 
    },
    image: {
        type: DataTypes.STRING 
    },
    idtopic: {
        type: DataTypes.INTEGER 
    },
    idcategory: {
        type: DataTypes.INTEGER 
    },
    groupquestion: {
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
module.exports = Quizs;
