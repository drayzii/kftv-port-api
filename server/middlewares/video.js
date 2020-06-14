import Joi from '@hapi/joi';

class validation {
  static async videoValidation(req, res, next) {
    const schema = Joi.object().keys({
      description: Joi.string().min(3).max(250).required()
        .error(() => 'You have to enter a valid description'),
      category: Joi.string().min(3).max(250).required()
        .error(() => 'You have to enter a valid category'),
    });
    await schema.validate(req.body, (err) => {
      if (err) {
        res.status(400).json({
          status: 400,
          message: err.details[0].message,
        });
      } else {
        next();
      }
    });
  }

  static async videoIdValidate(req, res, next) {
    const schema = Joi.object().keys({
      id: Joi.number().integer().min(1).required()
        .error(() => 'Enter a positive video id'),
    });
    await schema.validate(req.params, (err) => {
      if (err) {
        res.status(400).json({
          status: 400,
          message: err.details[0].message,
        });
      } else {
        next();
      }
    });
  }
}

export default validation;