import Joi from '@hapi/joi';

export default class validation {
  static async validateEnquiry(req, res, next) {
    const schema = Joi.object().keys({
      email: Joi.string().email()
        .required()
        .error(() => 'Enter a valid email Ex: example@gmail.com'),
      names: Joi.string().min(3).max(40)
        .required()
        .error(() => 'Please Enter a valid name Ex: Alain Christian'),
      message: Joi.string()
        .required()
        .error(() => 'Please Enter a valid message Ex: Do you do movie shoots'),
    });
    schema.validate(req.body, (err) => {
      if (err) {
        res.status(422).json({
          status: 422,
          message: err.details[0].message,
        });
      } else {
        next();
      }
    });
  }
}
