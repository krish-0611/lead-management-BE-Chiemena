const Joi = require('joi');

const leadSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(100)
    .required()
    .messages({
      'string.empty': 'Name is required',
      'string.min': 'Name should be at least 2 characters long',
      'string.max': 'Name cannot be longer than 100 characters'
    }),
    
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.empty': 'Email is required',
      'string.email': 'Please provide a valid email address'
    }),
    
  status: Joi.string()
    .valid('New', 'Engaged', 'Proposal Sent', 'Closed-Won', 'Closed-Lost')
    .default('New')
    .messages({
      'any.only': 'Status must be one of: New, Engaged, Proposal Sent, Closed-Won, Closed-Lost'
    })
});

const validateLead = (data) => {
  return leadSchema.validate(data, { abortEarly: false });
};

module.exports = {
  validateLead
}; 