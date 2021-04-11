'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('kabels', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nama: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      warna: {
        type: Sequelize.ENUM('merah', 'kuning', 'biru', 'hijau', 'jingga'),
        allowNull: false,
      },
      jenis: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      panjang: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      bending: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      loss: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      updator: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      isVerified: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        default: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('kabels');
  },
};
