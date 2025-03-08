const validateRequest = (validator) => {
  return (req, res, next) => {
    const { error } = validator(req.body);
    if (error) {
      const errors = error.details.map(detail => ({
        field: detail.path[0],
        message: detail.message
      }));
      return res.status(400).json({ 
        success: false,
        status: 'error',
        message: 'Validation failed',
        errors 
      });
    }
    next();
  };
};

module.exports = validateRequest; 