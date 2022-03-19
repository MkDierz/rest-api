const { Router } = require('express');
const { checkToken } = require('../../middleware/token');
const { api } = require('../../controllers');

const { getUserData } = api;

const router = Router();

router.use(checkToken);

router.get('/', getUserData);

module.exports = router;
