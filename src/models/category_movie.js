'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category_movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Category_movie.init({
    categoryId: DataTypes.INTEGER,
    movieId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Category_movie',
    tableName:'Category_movie'
  });
  return Category_movie;
};