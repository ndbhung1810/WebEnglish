const Joi = require('joi');

module.exports = {
    question: Joi.object().keys({
      image: Joi.string().allow("", null),
      name: Joi.string().required(),
      idtopic: Joi.number().required(),
      idcategory: Joi.number().required(),
      answera: Joi.string().allow("", null),
      answerb: Joi.string().allow("", null),
      answerc: Joi.string().allow("", null),
      answerd: Joi.string().allow("", null),
      answer: Joi.string().required(),
      level: Joi.number().required(),
      type: Joi.number().required(),
    }),
  };