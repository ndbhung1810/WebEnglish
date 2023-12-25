const ScoreModel = require("../models/score.model");
const Sequelize = require('sequelize');

exports.createScore = (quiz) => {
  return ScoreModel.create(quiz);
};



exports.findScoreByQuizID = (idquiz) => {
  return ScoreModel.findAll({
    where: {
      idquiz : idquiz    
    },
  });
};


exports.findScoreByUserID = (iduser) => {
  return ScoreModel.findAll({
    where: {
      iduser : iduser    
    },
  });
};


