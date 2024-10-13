'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('History', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type:  Sequelize.INTEGER
      },
      movieId: {
        type:  Sequelize.INTEGER
      },
      slug: {
        type:  Sequelize.INTEGER
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
    await queryInterface.dropTable('History');
  }
};