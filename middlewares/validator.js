const {check, validationResult} = require('express-validator');

exports.signupValidator = [
  check('name').not().isEmpty().withMessage('Name is required'),
  check('password').isLength({min: 6}).withMessage('Password must be at least 6 characters long')

]

exports.signinValidator = [
  check('password').isLength({min: 6}).withMessage('Password must be at least 6 characters long')

]

exports.validatorResult = (req, res, next) => {
  const result = validationResult(req);
  const hasErrors = !result.isEmpty();

  if (hasErrors) {
    const firstError = result.array()[0].msg;
    return res.status(400).json({
      error: firstError
    })
    // console.log(result.errors);
    // console.log(result);
  }
  next();
}