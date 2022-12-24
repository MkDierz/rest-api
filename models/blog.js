const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Blog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Blog.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user',
      });
    }
  }
  Blog.init({
    user_id: DataTypes.INTEGER,
    blogTitle: DataTypes.STRING,
    blogContent: DataTypes.TEXT,
    blogPublic: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Blog',
  });
  return Blog;
};
