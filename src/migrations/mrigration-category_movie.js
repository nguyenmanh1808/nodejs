'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Category_movie', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      categoryId: {
        type: Sequelize.INTEGER
      },
      movieId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE  
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE,
        
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Category_movie');
  }
};