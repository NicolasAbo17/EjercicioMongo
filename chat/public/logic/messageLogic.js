const joi = require("joi");

function validateMessage(message) {
    const schema = joi.object({
      author: joi
        .string()
        .pattern(/^[a-zA-Z]+\s[a-zA-Z]+$/)
        .required(),
      message: joi.string().min(5).required(),
      ts: joi.number(),
    });
  
    return schema.validate(message);
  }
exports.validateMessage = validateMessage;

 