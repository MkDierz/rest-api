const { Router } = require('express');
const requireDir = require('require-dir');
const { checkToken } = require('../../middleware/token');

const api = requireDir();

const router = Router();

router.use(checkToken);

router.use('/user', api.user);
router.use('/blog', api.blog);

module.exports = router;
