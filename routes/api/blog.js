const { Router } = require('express');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../middleware/validator');
const { api } = require('../../controllers');

const router = Router();
const {
  get, getId, post, deleteId, putId,
} = api.blog;
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
const checkId = [
  check('id')
    .exists()
    .withMessage('Id Required')
    .isNumeric()
    .withMessage('Id must be numeric'),
];

router.get('/', get);
router.post('/', checkInsert, handleValidationErrors, post);
router.get('/:id', checkId, handleValidationErrors, getId);
router.put('/:id', [...checkId, ...checkInsert], handleValidationErrors, putId);
router.delete('/:id', checkId, handleValidationErrors, deleteId);

module.exports = router;
