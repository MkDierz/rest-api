const { Router } = require('express');
const { check } = require('express-validator');
const requireDir = require('require-dir');
const { handleValidationErrors } = require('../../middleware/validator');

const router = Router();
const controllers = requireDir('../../controllers', { recurse: true });
const { get, post } = controllers.api.blog;
const checkInsert = [
  check('blogTitle')
    .exists()
    .withMessage('blogTitle is required')
    .isLength({ min: 3 })
    .withMessage('min length is 3'),
  check('blogContent')
    .exists()
    .withMessage('blogTitle is required')
    .isLength({ min: 3 })
    .withMessage('min length is 3'),
];

router.get('/', get);
router.post('/', checkInsert, handleValidationErrors, post);

module.exports = router;
