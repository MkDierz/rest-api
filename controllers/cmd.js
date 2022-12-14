const { Sequelize } = require('sequelize');
const { Umzug, SequelizeStorage } = require('umzug');

const config = require('../config/config.json');

const umzug = (env) => {
  const sequelize = new Sequelize(env.database, env.username, env.password, env);
  return new Umzug({
    migrations: {
      glob: 'migrations/*.js',
      resolve: ({ name, path, context }) => {
        // eslint-disable-next-line import/no-dynamic-require, global-require
        const migration = require(path);
        return {
          // adjust the parameters Umzug will
          // pass to migration methods when called
          name,
          up: async () => migration.up(context, Sequelize),
          down: async () => migration.down(context, Sequelize),
        };
      },
    },
    context: sequelize.getQueryInterface(),
    storage: new SequelizeStorage({ sequelize }),
    logger: console,
  });
};

const returnMsg = ({
  msg, env, envConfig, data,
} = {}) => {
  const retVal = {};
  if (msg) {
    retVal.message = msg;
  }
  if (env) {
    retVal.connection = {
      env,
    };
  }
  if (envConfig) {
    retVal.connection = {
      ...retVal.connection,
      ...envConfig,
    };
  }
  if (data) {
    retVal.data = data;
  }
  return retVal;
};

async function up(req, res) {
  const env = req.params.env || 'development';
  const envConfig = config[env];
  const conn = umzug(envConfig);
  await conn
    .up()
    .then((migrations) => res
      .status(200)
      .send(
        returnMsg({
          msg: 'database migration executed', env, envConfig, data: migrations,
        }),
      ))
    .catch((error) => res.status(500).send({ message: error.message }));
}

async function down(req, res) {
  try {
    const env = req.params.env || 'development';
    const envConfig = config[env];
    const conn = umzug(envConfig);
    return await conn
      .down()
      .then((migrations) => res
        .status(200)
        .send(
          returnMsg({
            msg: 'database migration reverted', env, envConfig, data: migrations,
          }),
        ));
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
}

async function pending(req, res) {
  try {
    const env = req.params.env || 'development';
    const envConfig = config[env];
    const conn = umzug(envConfig);
    return await conn
      .pending()
      .then((migrations) => res.status(200).send(returnMsg({ data: migrations })));
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
}

async function executed(req, res) {
  try {
    const env = req.params.env || 'development';
    const envConfig = config[env];
    const conn = umzug(envConfig);
    return await conn
      .executed()
      .then((migrations) => res.status(200).send(returnMsg({ data: migrations })));
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
}

module.exports = {
  up,
  down,
  pending,
  executed,
};
