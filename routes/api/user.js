const { Router } = require('express');
const Controller = require('../../controllers');

const { userData, updateProfile } = Controller.api.user;

const router = Router();

router.get('/', userData);
router.post('/', updateProfile);

module.exports = router;
