const CategoryModel = require("../models/category.model");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.createCategory = (category) => {
  console.log(category);
  return CategoryModel.create(category);
};

exports.updateCategory = (category, id) => {
  return CategoryModel.update(category, {
    where: { id: id },
  });
};

exports.deleteCategory = (id) => {
  return CategoryModel.destroy({ where: { id: id } });
};

exports.findAll = (page, limit, query) => {
  const skip = (page - 1) * limit;
  return CategoryModel.findAll({
    limit,
    offset: skip,
    where: {
      name: { [Op.like]: `%${query}%` }
    },
  });
};


exports.getTotal = () => {
    return CategoryModel.count();
};

exports.findByID = (id) => {
  return CategoryModel.findByPk(id);
};
