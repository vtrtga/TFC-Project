'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('matches', {
      id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
      },
      home_team: Sequelize.INTEGER,
      home_team_goals: Sequelize.INTEGER,
      away_team: Sequelize.INTEGER,
      away_team_goals: Sequelize.INTEGER,
      in_progress: Sequelize.BOOLEAN,
    })
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable('matches');
  },
};
