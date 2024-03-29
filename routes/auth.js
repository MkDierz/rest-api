const { check } = require('express-validator');
const { Router } = require('express');
const { handleValidationErrors } = require('../middleware/validator');
const { auth } = require('../controllers');

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
      .withMessage('password is required'),
  ],
  handleValidationErrors,
  auth.register,
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
      .withMessage('password is required'),
  ],
  handleValidationErrors,
  auth.login,
);
router.post(
  '/refresh-token',
  [
    check('token')
      .exists()
      .withMessage('token is required'),
  ],
  handleValidationErrors,
  auth.refreshToken,
);
module.exports = router;
