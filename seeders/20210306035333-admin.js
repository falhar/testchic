'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
      {
        username: 'admin',
        password: bcrypt.hashSync('123456', 12),
        refreshToken:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoidXNlcjIiLCJpZCI6NH0sImlhdCI6MTYxODEwMTM4NywiZXhwIjoxNjE4NzA2MTg3fQ.lKbtRzWOmVsArIfMmwneCtt-hcvVurDzUV8S1O2Nw0k',
        role: 'admin',
        foto: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  },
};
