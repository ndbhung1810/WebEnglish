const { DataTypes } = require('sequelize');
const sequelize = require('./connection');

const Questions = sequelize.define('Questions', {
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
    idcreated: {
        type: DataTypes.INTEGER 
    },
    answera: {
        type: DataTypes.STRING 
    },
    answerb: {
        type: DataTypes.STRING 
    },
    answerc: {
        type: DataTypes.STRING 
    },
    answerd: {
        type: DataTypes.STRING 
    },
    answer: {
        type: DataTypes.STRING 
    },
    level: {
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
module.exports = Questions;
