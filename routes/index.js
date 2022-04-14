const { Router } = require('express');
const requireDir = require('require-dir');

const Routes = requireDir('.', { recurse: true });

const router = Router();

router.use('/auth/v1/', Routes.auth);
router.use('/api/v1/', Routes.api.index);
router.use('/exec/', Routes.cmd);

module.exports = router;
