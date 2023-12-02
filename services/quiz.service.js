const QuizModel = require("../models/quiz.model");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.createQuiz = (quiz) => {
  return QuizModel.create(quiz);
};

exports.updateQuiz = (quiz, id) => {
  return QuizModel.update(quiz, {
    where: { id: id },
  });
};

exports.deleteQuiz = (id) => {
  return QuizModel.destroy({ where: { id: id } });
};

exports.findAll = (page, limit, query, idtopic, idcategory) => {
  const skip = (page - 1) * limit;
  return QuizModel.findAll({
    limit:+limit,
    offset: skip,
    where: {
      ...(!!idtopic ? {idtopic} : {},!!idcategory ? {idcategory} : {}), 
      name: { [Op.like]: `%${query}%` },
      
    },
  });
};


exports.getTotal = () => {
    return QuizModel.count();
};

exports.findByID = (id) => {
  return QuizModel.findByPk(id);
};
