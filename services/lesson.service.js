const LessonModel = require("../models/lesson.model");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.createLesson = (lesson) => {
  console.log(lesson);
  return LessonModel.create(lesson);
};

exports.updateLesson = (lesson, id) => {
  return LessonModel.update(lesson, {
    where: { id: id },
  });
};

exports.deleteLesson = (id) => {
  return LessonModel.destroy({ where: { id: id } });
};

exports.findAll = (page, limit, query, idtopic) => {
  const skip = (page - 1) * limit;
  return LessonModel.findAll({
    limit,
    offset: skip,
    where: {
      idtopic: idtopic, 
      name: { [Op.like]: `%${query}%` }
    },
  });
};


exports.getTotal = (idtopic) => {
    return LessonModel.count({where:{idtopic:idtopic}});
};

exports.findByID = (id) => {
  return LessonModel.findByPk(id);
};
