const { check, validationResult } = require('express-validator');
const { kabels } = require('../../models');

module.exports = {
  create: [
    check('nama').notEmpty().withMessage('nama tidak boleh kosong'),
    check('warna')
      .notEmpty()
      .withMessage('warna tidak boleh kosong')
      .custom(async (warna) => {
        if (
          warna == 'merah' ||
          warna == 'jingga' ||
          warna == 'kuning' ||
          warna == 'hijau' ||
          warna == 'biru'
        ) {
          return true;
        }
      })
      .withMessage('hanya bisa merah, jingga, kuning, hijau atau biru'),
    check('jenis').notEmpty().withMessage('jenis tidak boleh kosong'),
    check('panjang').notEmpty().withMessage('panjang tidak boleh kosong'),
    check('bending').notEmpty().withMessage('bending tidak boleh kosong'),
    check('loss').notEmpty().withMessage('loss tidak boleh kosong'),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({
          errors: errors.mapped(),
        });
      }
      next();
    },
  ],
  getByWarna: [
    check('warna')
      .notEmpty()
      .withMessage('warna tidak boleh kosong')
      .custom(async (warna) => {
        if (
          warna == 'merah' ||
          warna == 'jingga' ||
          warna == 'kuning' ||
          warna == 'hijau' ||
          warna == 'biru'
        ) {
          return true;
        }
      })
      .withMessage('hanya bisa merah, jingga, kuning, hijau atau biru'),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({
          errors: errors.mapped(),
        });
      }
      next();
    },
  ],
  getByJenis: [
    check('jenis').notEmpty().withMessage('jenis tidak boleh kosong'),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({
          errors: errors.mapped(),
        });
      }
      next();
    },
  ],
  update: [
    check('id')
      .notEmpty()
      .withMessage('id tidak boleh kosong')
      .custom(async (id) => {
        const result = await kabels.findOne({
          where: { id },
        });
        if (result) {
          return true;
        }
      })
      .withMessage('kabel tidak ditemukan'),
    check('nama').notEmpty().withMessage('nama tidak boleh kosong'),
    check('warna')
      .notEmpty()
      .withMessage('warna tidak boleh kosong')
      .custom(async (warna) => {
        if (
          warna == 'merah' ||
          warna == 'jingga' ||
          warna == 'kuning' ||
          warna == 'hijau' ||
          warna == 'biru'
        ) {
          return true;
        }
      })
      .withMessage('hanya bisa merah, jingga, kuning, hijau atau biru'),
    check('jenis').notEmpty().withMessage('jenis tidak boleh kosong'),
    check('panjang').notEmpty().withMessage('panjang tidak boleh kosong'),
    check('bending').notEmpty().withMessage('bending tidak boleh kosong'),
    check('loss').notEmpty().withMessage('loss tidak boleh kosong'),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log(errors);

        return res.status(422).json({
          errors: errors.mapped(),
        });
      }
      next();
    },
  ],
  verify: [
    check('id')
      .notEmpty()
      .withMessage('id tidak boleh kosong')
      .custom(async (id) => {
        const result = await kabels.findOne({
          where: { id },
        });
        if (!result) {
          throw new Error('kabel tidak ditemukan');
        }
      }),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log(errors);
        return res.status(422).json({
          errors: errors.mapped(),
        });
      }
      next();
    },
  ],
  delete: [
    check('id')
      .notEmpty()
      .withMessage('id tidak boleh kosong')
      .custom(async (id) => {
        const result = await kabels.findOne({
          where: { id },
        });
        if (!result) {
          throw new Error('kabel tidak ditemukan');
        }
      }),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log(errors);
        return res.status(422).json({
          errors: errors.mapped(),
        });
      }
      next();
    },
  ],
};
