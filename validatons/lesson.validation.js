const Joi = require('joi');

module.exports = {
    lesson: Joi.object().keys({
        name: Joi.string().required(),
        image: Joi.string().required(),
        sound: Joi.string().required(),
        idtopic: Joi.number().required(),
    }),
}