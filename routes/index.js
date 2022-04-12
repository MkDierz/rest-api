const { Router } = require('express');
const auth = require('./auth');
const api = require('./api');
const cmd = require('./cmd');
const { environment } = require('../config');

const router = Router();

router.use('/auth/v1/', auth);
router.use('/api/v1/', api);

if (environment === 'development') {
  router.use('/exec/', cmd);
}

module.exports = router;
