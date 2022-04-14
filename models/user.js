/* eslint-disable no-param-reassign */
const bcrypt = require('bcrypt');
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Blog, {
        foreignKey: 'user_id',
        as: 'blogs'
      });
    }
  }
  User.init({
    userName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    userLevel: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          const salt = bcrypt.genSaltSync(10, 'a');
          user.password = bcrypt.hashSync(user.password, salt);
        }
      },
      beforeUpdate: async (user) => {
        if (user.password) {
          const salt = bcrypt.genSaltSync(10, 'a');
          user.password = bcrypt.hashSync(user.password, salt);
        }
      }
    },
    instanceMethods: {
      validPassword: (password) => bcrypt.compareSync(password, this.password)
    },
    defaultScope: {
      attributes: { exclude: ['password'] }
    },
  });
  User.prototype.validPassword = async (password, hash) => bcrypt.compareSync(password, hash);
  return User;
};
