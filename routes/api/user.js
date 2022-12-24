const { Router } = require('express');
const { api } = require('../../controllers');

const { userData, updateProfile } = api.user;

const router = Router();

router.get('/', userData);
router.post('/', updateProfile);

module.exports = router;
