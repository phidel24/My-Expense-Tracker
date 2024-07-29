'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
    * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Expense, { foreignKey: 'userId', as: 'expenses' });
    }
  }

  User.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    dp_link: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'user'
  });
  return User;
};