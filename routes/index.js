const { Router } = require('express');
const auth = require('./auth');
const api = require('./api');

const router = Router();

router.use('/auth/v1/', auth);
router.use('/api/v1/', api);

/* GET index page. */
router.get('*', (req, res) => {
  res.status(404).send();
});

module.exports = router;
