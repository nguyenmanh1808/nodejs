'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      History.belongsTo(models.User);
      History.belongsTo(models.Movie);
    }
  };
  History.init({
    userId: DataTypes.INTEGER,
    movieId: DataTypes.INTEGER,
    slug: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'History',
     tableName: 'History'
  });
  return History;
};