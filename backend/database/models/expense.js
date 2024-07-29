'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Expense extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    Expense.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'owner'
    });
    Expense.belongsTo(models.Category, {
      foreignKey: 'categoryId',
      as: 'group'
    });
    }
  }
  Expense.init({
    title: DataTypes.STRING,
    amount: DataTypes.FLOAT,
    userId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Expense',
    tableName: 'expense'
  });
  return Expense;
};