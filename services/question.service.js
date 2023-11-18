const Categorys = require("../models/category.model");
const QuestionModel = require("../models/question.model");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.createQuestion = (question) => {
  return QuestionModel.create(question);
};

exports.updateQuestion = (question, id) => {
  return QuestionModel.update(question, {
    where: { id: id },
  });
};

exports.deleteQuestion = (id) => {
  return QuestionModel.destroy({ where: { id: id } });
};

exports.findAll = (page, limit, query, idtopic, idcategory) => {
  const skip = (page - 1) * limit;
  if((idtopic == undefined || idtopic == null) 
  && (idcategory == undefined || idcategory == null)){
    return QuestionModel.findAll({
      limit:+limit,
      offset: skip,
      where: {
        name: { [Op.like]: `%${query}%` },
      },
    });
  } else if((idtopic == undefined || idtopic == null) ) {
    return QuestionModel.findAll({
      limit:+limit,
      offset: skip,
      where: {
        name: { [Op.like]: `%${query}%` },
        idcategory:idcategory
      },
    });
  } 
  else if((idcategory == undefined || idcategory == null) ) {
    return QuestionModel.findAll({
      limit:+limit,
      offset: skip,
      where: {
        name: { [Op.like]: `%${query}%` },
        idtopic:idtopic
      },
    });
  } 
};


exports.getTotal = () => {
    return QuestionModel.count();
};

exports.findByID = (id) => {
  return QuestionModel.findByPk(id);
};
