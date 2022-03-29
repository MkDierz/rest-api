const { Router } = require('express');
const { api } = require('../../controllers');

const router = Router();
const { userData } = api;

router.get('/', userData);

module.exports = router;
