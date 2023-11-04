const TopicModel = require("../models/topic.model");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.createTopic = (topic) => {
  console.log(topic);
  return TopicModel.create(topic);
};

exports.updateTopic = (topic, id) => {
  return TopicModel.update(topic, {
    where: { id: id },
  });
};

exports.deleteTopic = (id) => {
  return TopicModel.destroy({ where: { id: id } });
};

exports.findAll = (page, limit, query) => {
  const skip = (page - 1) * limit;
  return TopicModel.findAll({
    limit,
    offset: skip,
    where: {
      name: { [Op.like]: `%${query}%` }
    },
  });
};


exports.getTotal = () => {
    return TopicModel.count();
};

exports.findByID = (id) => {
  return TopicModel.findByPk(id);
};
