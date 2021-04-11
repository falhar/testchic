'use strict';
const { convertCSVToArray } = require('convert-csv-to-array');
const fs = require('fs');
const path = require('path');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const result = convertCSVToArray(
      fs.readFileSync(path.join(__dirname, '/kabel.csv')).toString(),
      {
        separator: ',',
        type: 'array',
      }
    );

    const today = new Date();
    return queryInterface.bulkInsert(
      'kabels',
      result.map((item) => ({
        id: item[0],
        nama: item[1],
        warna: item[2],
        jenis: item[3],
        panjang: item[4],
        bending: item[5],
        loss: item[6],
        updator: item[7],
        isVerified: item[8],
        createdAt: today,
        updatedAt: today,
      }))
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('kabels', null, {});
  },
};
