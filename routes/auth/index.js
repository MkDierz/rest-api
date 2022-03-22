const { Router } = require('express');
const { auth } = require('../../controllers');

const { register, login, refreshToken } = auth;

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/refresh-token', refreshToken);

module.exports = router;
