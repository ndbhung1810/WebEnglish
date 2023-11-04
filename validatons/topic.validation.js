const Joi = require('joi');

module.exports = {
    topic: Joi.object().keys({
        name: Joi.string().required(),
        image: Joi.string().required(),
    }),
}