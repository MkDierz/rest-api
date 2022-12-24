const { Router } = require('express');
const { checkToken } = require('../../middleware/token');
const user = require('./user');
const blog = require('./blog');

const router = Router();

router.use(checkToken);

router.use('/user', user);
router.use('/blog', blog);

module.exports = router;
