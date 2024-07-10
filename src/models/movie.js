'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Movie.belongsToMany(models.Category,{ through: 'Category_movie' })
      Movie.hasMany(models.Comment);
      Movie.hasMany(models.Episode);
    }
  };
  Movie.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING(600),
    type: DataTypes.STRING,
    time: DataTypes.STRING,
    status: DataTypes.STRING,
    national: DataTypes.STRING,
    view: DataTypes.INTEGER,
    url_img: DataTypes.STRING,
    ep_current:  DataTypes.INTEGER,
    ep_total: DataTypes.INTEGER,
    actor: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Movie',
  });
  return Movie;
};