'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Kabel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Kabel.belongsTo(models.users, {
        foreignKey: 'updator',
        as: 'updatedBy',
      });
    }
  }
  Kabel.init(
    {
      nama: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      warna: {
        type: DataTypes.ENUM('merah', 'kuning', 'biru', 'hijau', 'jingga'),
        allowNull: false,
      },
      jenis: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      panjang: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      bending: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      loss: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      updator: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      isVerified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'kabels',
      paranoid: true,
      timestamps: true,
      freezeTableName: true,
    }
  );
  return Kabel;
};
