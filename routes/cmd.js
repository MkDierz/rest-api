const { Router } = require('express');
// const { commands } = require('npm');
const { exec } = require('child_process');

const router = Router();

router.post('/db-migrate-up/:env', async (req, res) => {
  const env = req.params.env || 'development';
  let cmd = 'npx sequelize-cli db:migrate ';
  if (env === 'production') {
    cmd += '--env production';
  }
  try {
    await new Promise((resolve, reject) => {
      const migrate = exec(
        cmd,
        { env: process.env },
        (err) => (err ? reject(err) : resolve())
      );

      // Forward stdout+stderr to this process
      migrate.stdout.pipe(process.stdout);
      migrate.stderr.pipe(process.stderr);
    });
    res.status(200).send({ message: 'database migration complete' });
  } catch (error) {
    res.status(500).send({ message: 'database migration failed', error });
  }
});

router.post('/db-migrate-down/:env', async (req, res) => {
  const env = req.params.env || 'development';
  let cmd = 'npx sequelize-cli db:migrate:down ';
  if (env === 'production') {
    cmd += '--env production';
  }
  try {
    await new Promise((resolve, reject) => {
      const migrate = exec(
        cmd,
        { env: process.env },
        (err) => (err ? reject(err) : resolve())
      );

      // Forward stdout+stderr to this process
      migrate.stdout.pipe(process.stdout);
      migrate.stderr.pipe(process.stderr);
    });
    res.status(200).send({ message: 'database migration complete' });
  } catch (error) {
    res.status(500).send({ message: 'database migration failed', error });
  }
});

module.exports = router;
