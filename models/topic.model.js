const { DataTypes } = require('sequelize');
const sequelize = require('./connection');

const Topics = sequelize.define('Topics', {
    name: {
        type: DataTypes.STRING 
    },
    image: {
        type: DataTypes.STRING 
    },
    video: {
        type: DataTypes.STRING 
    },
    description: {
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
module.exports = Topics;
