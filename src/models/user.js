'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Group);
      User.hasMany(models.Comment);
      User.hasMany(models.History);
      User.hasMany(models.Like);
    }
  };
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    username: DataTypes.STRING,
    sex: DataTypes.STRING,
    age: DataTypes.INTEGER,
    groupId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};