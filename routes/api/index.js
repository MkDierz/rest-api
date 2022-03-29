const { Router } = require('express');
const { checkToken } = require('../../middleware/token');
const user = require('./user');

const router = Router();

router.use(checkToken);

router.use('/user', user);
module.exports = router;
