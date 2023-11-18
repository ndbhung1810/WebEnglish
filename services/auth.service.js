const UserModel = require('../models/user.model');
const cacheUtil = require('../utils/cache.util');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.createUser = (user) => {
    console.log(user);
    return UserModel.create(user);
}

exports.findUserByEmail = (email) => {
    return UserModel.findOne({
        where: {
            email: email,
        }
    })
}

exports.findUserById = (id) => {
    return UserModel.findByPk(id);
}

exports.logoutUser = (token, exp) => {
    const now = new Date();
    const expire = new Date(exp * 1000);
    const milliseconds = expire.getTime() - now.getTime();
    /* ----------------------------- BlackList Token ---------------------------- */
    return cacheUtil.set(token, token, milliseconds);
}


exports.findAll = (page, limit, query) => {
    const skip = (page - 1) * limit;
    return UserModel.findAll({
      limit:+limit,
      offset: skip,
      where: {
        [Op.or]:{
            username: { [Op.like]: `%${query}%` },
            email : { [Op.like]: `%${query}%` },
        }
      },
    });
  };
  
  
  exports.getTotal = () => {
      return UserModel.count();
  };
  
  exports.findByID = (id) => {
    return UserModel.findByPk(id);
  };


  exports.update = (user, id) => {
    return UserModel.update(user, {
      where: { id: id },
    });
  };