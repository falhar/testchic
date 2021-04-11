const {
  check,
  validationResult,
  sanitize,
  matchedData,
} = require('express-validator');
const { users } = require('../../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const path = require('path');
const multer = require('multer');
const crypto = require('crypto');

const uploadDir = '/img/'; // make images upload to /img/
const storage = multer.diskStorage({
  destination: './public' + uploadDir, // make images upload to /public/img/
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      if (err) return cb(err);

      cb(null, raw.toString('hex') + path.extname(file.originalname)); // encrypt filename and save it into the /public/img/ directory
    });
  },
});

const upload = multer({
  storage: storage,
  dest: uploadDir,
});

module.exports = {
  signup: [
    check('username')
      .notEmpty()
      .withMessage('username cant null')
      .matches(/^[a-zA-Z0-9_-]{3,32}$/)
      .withMessage('invalid username value'),
    check('password')
      .notEmpty()
      .withMessage('password cant null')
      .isLength({
        min: 6,
        max: 32,
      })
      .withMessage('password must have 6 to 32 characters'),
    check('passwordConfirmation')
      .notEmpty()
      .withMessage('password confirmation cant null')
      .custom((value, { req }) => value === req.body.password)
      .withMessage('wrong password confirmation'),
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
  //Validation check when user login
  login: [
    check('username')
      .notEmpty()
      .withMessage('username cant null')
      .isString()
      .withMessage('invalid input'),
    check('password').notEmpty().withMessage('password cant null'),
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
  token: [
    check('token')
      .notEmpty()
      .withMessage('token cant empty')
      .custom(async (token) => {
        return jwt.verify(token, 'secretToken');
      }),
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
  //show other user profile
  getOne: [
    check('username')
      .notEmpty()
      .withMessage('username cant null')
      .isString()
      .withMessage('invalid input')
      .custom((username) => {
        return users
          .findOne({
            where: {
              username,
            },
          })
          .then((result) => {
            if (!result) {
              throw new Error('user not found!');
            }
          });
      }),
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
  //Validation check when user update profile
  update: [
    upload.single('foto'),
    check('foto')
      .custom((value, { req }) => {
        if (req.file === undefined) {
          return true;
        } else if (req.file.mimetype.startsWith('image')) {
          return true;
        } else {
          return false;
        }
      })
      .withMessage('file upload must be images file'),
    check('foto')
      .custom((value, { req }) => {
        if (req.file === undefined) {
          return true;
        } else if (req.file.size > 1 * 1024 * 1024) {
          return false;
        } else {
          return true;
        }
      })
      .withMessage('file size max 1mb'),
    check('username')
      .notEmpty()
      .withMessage('username cant null')
      .matches(/^[a-zA-Z0-9_-]{3,32}$/)
      .withMessage('invalid username value'),
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
  delete: [
    check('username').custom((username) => {
      return users
        .findOne({
          where: {
            username,
          },
          paranoid: false,
        })
        .then((result) => {
          if (!result) {
            throw new Error('User not found!');
          }
        });
    }),
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
  restore: [
    check('username').custom((username) => {
      return users
        .findOne({
          where: {
            username,
          },
          paranoid: false,
        })
        .then((result) => {
          if (!result) {
            throw new Error('User not found!');
          } else if ((result.deletedAt = null)) {
            throw new Error('User exists, no need to restore');
          }
        });
    }),
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
};
