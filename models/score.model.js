const { DataTypes } = require('sequelize');
const sequelize = require('./connection');

const Scores = sequelize.define('Scores', {
    iduser: {
        type: DataTypes.INTEGER 
    },
    idquiz: {
        type: DataTypes.INTEGER 
    },
    score: {
        type: DataTypes.INTEGER 
    },
    total: {
        type: DataTypes.INTEGER 
    },
    historyanswer: {
        type: DataTypes.STRING 
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
module.exports = Scores;
