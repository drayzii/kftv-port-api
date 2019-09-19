
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Videos', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    description: {
      type: Sequelize.STRING,
    },
    category: {
      type: Sequelize.STRING,
    },
    thumbnail: {
      type: Sequelize.STRING,
    },
    url: {
      type: Sequelize.STRING,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Videos'),
};
