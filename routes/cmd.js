const { Router } = require('express');
const { check } = require('express-validator');
const { cmd } = require('../controllers');
const { handleValidationErrors } = require('../middleware/validator');
const { checkToken } = require('../middleware/token');
const { environment } = require('../config');

const router = Router();

const {
  up, down, pending, executed,
} = cmd;

const checkEnv = [
  check('env')
    .exists()
    .withMessage('environment is required')
    .isLength({ min: 3 })
    .withMessage('wrong userName length'),
];

if (environment !== 'development') {
  router.use(checkToken);
}

router.post('/db/migrate-up/:env', checkEnv, handleValidationErrors, up);
router.post('/db/migrate-down/:env', checkEnv, handleValidationErrors, down);
router.post('/db/migrate-pending/:env', checkEnv, handleValidationErrors, pending);
router.post('/db/migrate-executed/:env', checkEnv, handleValidationErrors, executed);

module.exports = router;
