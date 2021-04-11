'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Users.hasMany(models.kabels, {
        foreignKey: 'updator',
        as: 'updatedBy',
      });
    }
  }
  Users.init(
    {
      username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
          // Storing passwords in plaintext in the database is terrible.
          // Hashing the value with an appropriate cryptographic hash function is better.
          this.setDataValue('password', bcrypt.hashSync(value, 12));
        },
      },
      refreshToken: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      foto: {
        type: DataTypes.STRING,
        allowNull: true,
        //Set custom getter for book image using URL
        get() {
          const foto = this.getDataValue('foto');
          return '/img/' + foto;
        },
      },
    },
    {
      sequelize,
      modelName: 'users',
      paranoid: true,
      timestamps: true,
      freezeTableName: true,
    }
  );
  return Users;
};
