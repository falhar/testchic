const passport = require('passport');
const router = require('express').Router();
const auth = require('../middlewares/auth');
const userValidator = require('../middlewares/validators/userValidator');
const UserController = require('../controllers/userController');

//Register
router.post('/signup', [
  userValidator.signup,
  function (req, res, next) {
    passport.authenticate(
      'signup',
      {
        session: false,
      },
      function (err, user, info) {
        if (err) {
          return next(err);
        }
        if (!user) {
          res.status(401).json({
            status: 'Error',
            message: info.message,
          });
          return;
        }
        UserController.signup(user, req, res, next);
      }
    )(req, res, next);
  },
]);

//Login
router.post('/login', [
  userValidator.login,
  function (req, res, next) {
    passport.authenticate(
      'login',
      {
        session: false,
      },
      function (err, user, info) {
        if (err) {
          return next(err);
        }
        if (!user) {
          res.status(401).json({
            status: 'Error',
            message: info.message,
          });
          return;
        }
        UserController.login(user, req, res, next);
      }
    )(req, res, next);
  },
]);

//refresh token
router.post('/token', userValidator.token, UserController.token);

//Show Our Profile
router.get(
  '/profile',
  [
    passport.authenticate('karyawan', {
      session: false,
    }),
  ],
  UserController.getOne
);

//Update Profile
router.put(
  '/profile/update',
  [
    passport.authenticate('karyawan', {
      session: false,
    }),
    userValidator.update,
  ],
  UserController.update
);

//Show other user profile
router.get(
  '/profile/:username',
  userValidator.getOne,
  UserController.getOneOther
);

//Delete User via admin
router.delete(
  '/delete/:username',
  [passport.authenticate('admin', { session: false }), userValidator.delete],
  UserController.delete
);

//Restore User via admin
router.put(
  '/restore/:username',
  [passport.authenticate('admin', { session: false }), userValidator.restore],
  UserController.restore
);

//Hard delete via admin
router.delete(
  '/hard_delete/:username',
  [passport.authenticate('admin', { session: false }), userValidator.delete],
  UserController.hard_deleted
);

module.exports = router;
