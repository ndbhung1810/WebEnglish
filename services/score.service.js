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



exports.dashboard = () => {
  return ScoreModel.findAll({
    attributes: [
      'idquiz',
      [Sequelize.fn('COUNT', Sequelize.col('iduser')), 'count'],
    ],
    group: ['idquiz','iduser'],
  });
};


exports.dashboardrank = () => {
   console.log("scores")
  return ScoreModel.findAll({
    attributes: [
      'iduser',
      [Sequelize.fn('sum', Sequelize.col('score')), 'total'],
    ],
    group: ['iduser'],
    order: [
      [Sequelize.fn('sum', Sequelize.col('score')), 'DESC'],
    ],
  });
};
