const { Router } = require('express');

const auth = require('./auth');
const api = require('./api');
const cmd = require('./cmd');

const router = Router();

router.use('/auth/v1/', auth);
router.use('/api/v1/', api);
router.use('/exec/', cmd);

module.exports = router;
