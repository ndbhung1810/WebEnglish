const Joi = require('joi');

module.exports = {
    category: Joi.object().keys({
        name: Joi.string().required(),
        image: Joi.string().required(),
    }),
}