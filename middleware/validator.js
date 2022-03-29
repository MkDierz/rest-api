const { validationResult } = require('express-validator');
const util = require('util');

function handleValidationErrors(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(util.inspect(errors.array()));
    return res.status(422).json({ errors: errors.array() });
  }

  return next();
}

module.exports = { handleValidationErrors };
