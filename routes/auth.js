const { check } = require('express-validator');
const { Router } = require('express');
const { auth } = require('../controllers');
const { handleValidationErrors } = require('../middleware/validator');

const { register, login, refreshToken } = auth;

const router = Router();

router.post(
  '/register',
  [
    check('userName')
      .exists()
      .withMessage('userName is required')
      .isLength({ min: 3 })
      .withMessage('wrong userName length'),
    check('email')
      .exists()
      .withMessage('email is required')
      .isEmail()
      .withMessage('email not valid'),
    check('password')
      .exists()
      .withMessage('password is required')
  ],
  handleValidationErrors,
  register
);
router.post(
  '/login',
  [
    check('email')
      .exists()
      .withMessage('email is required')
      .isEmail()
      .withMessage('email not valid'),
    check('password')
      .exists()
      .withMessage('password is required')
  ],
  handleValidationErrors,
  login
);
router.post(
  '/refresh-token',
  [
    check('token')
      .exists()
      .withMessage('token is required')
  ],
  handleValidationErrors,
  refreshToken
);
module.exports = router;
