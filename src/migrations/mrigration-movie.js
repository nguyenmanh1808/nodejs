'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Movies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      time: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      national: {
        type: Sequelize.STRING
      },
      view: {
        type: Sequelize.INTEGER
      },
      url_img: {
        type: Sequelize.STRING
      },
      ep_curent: {
        type: Sequelize.INTEGER
      },
      ep_total: {
        type: Sequelize.STRING
      },
      category: {
        type: Sequelize.INTEGER
      },
      actor: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Movies');
  }
};