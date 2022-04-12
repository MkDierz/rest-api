const { Router } = require('express');
// const { commands } = require('npm');
const { exec } = require('child_process');

const router = Router();

router.post('/migrate-prod', async (req, res) => {
  await new Promise((resolve, reject) => {
    const migrate = exec(
      'sequelize db:migrate',
      { env: process.env },
      (err) => (err ? reject(err) : resolve())
    );

    // Forward stdout+stderr to this process
    migrate.stdout.pipe(process.stdout);
    migrate.stderr.pipe(process.stderr);
  });
  res.status(200).send({ message: 'database migration complete' });
});

module.exports = router;
