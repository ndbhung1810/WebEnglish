const Joi = require('joi');

module.exports = {
    question: Joi.object().keys({
        image:Joi.string(),
        name: Joi.string().required(),
        idtopic: Joi.number().required(),
        idcategory: Joi.number().required(),
        answera:Joi.string(),
        answerb:Joi.string(),
        answerc:Joi.string(),
        answerd:Joi.string(),
        answer:Joi.string().required(),
        level:Joi.number().required(),
        type:Joi.number()
    }),
}