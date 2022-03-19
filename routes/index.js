const { Router } = require('express');
const auth = require('./auth');
const api = require('./api');

const router = Router();

router.use('/auth', auth);
router.use('/api', api);

/* GET index page. */
router.get('*', (req, res) => {
  res.status(404).send();
});

module.exports = router;
