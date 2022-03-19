const { Router } = require('express');
const { auth } = require('../../controllers');

const { register, login } = auth;

const router = Router();

router.post('/register', register);
router.post('/login', login);

module.exports = router;
