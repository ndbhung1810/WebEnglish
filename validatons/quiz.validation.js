const Joi = require('joi');

module.exports = {
    quiz: Joi.object().keys({
        name: Joi.string().required(),
        idtopic: Joi.number().required(),
        idcategory: Joi.number().required(),
        idcreated: Joi.number().required(),
        groupquestion:Joi.string().required(),
        image :Joi.string().required(),
    }),
}