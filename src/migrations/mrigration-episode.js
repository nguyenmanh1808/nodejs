'use strict';

const { name } = require("ejs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Episodes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      movieId: {
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      slug: {
        type: Sequelize.INTEGER
      },
      ep_url: {
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
    await queryInterface.dropTable('Episodes');
  }
};