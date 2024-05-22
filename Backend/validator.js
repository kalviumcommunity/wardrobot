const Joi = require('joi');

// Validator function
const validator = (schema) => (payload) => 
    schema.validate(payload, { abortEarly: false });

// Schema definition
const outfitSchema = Joi.object({
    userName: Joi.string().required(),
    file: Joi.any().required(),  // Expecting a file to be present
    dressType: Joi.string().required(),
    occasion: Joi.string().required()
});

const validateOutfit = validator(outfitSchema);

module.exports = validateOutfit;
