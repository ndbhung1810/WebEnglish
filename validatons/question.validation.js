const Joi = require('joi');

module.exports = {
    question: Joi.object().keys({
        name: Joi.string().required(),
        idtopic: Joi.number().required(),
        idcategory: Joi.number().required(),
        idcreated: Joi.number().required(),
        answera:Joi.string().required(),
        answerb:Joi.string().required(),
        answerc:Joi.string().required(),
        answerd:Joi.string().required(),
        answer:Joi.string().required(),
        level:Joi.number().required(),
    }),
}