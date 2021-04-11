const passport = require('passport');
const router = require('express').Router();
const auth = require('../middlewares/auth');
const kabelValidator = require('../middlewares/validators/kabelValidator');
const KabelController = require('../controllers/kabelController');

router.post(
  '/create',
  [
    passport.authenticate('karyawan', { session: false }),
    kabelValidator.create,
  ],
  KabelController.create
);

router.get(
  '/warna/:warna',
  [
    passport.authenticate('karyawan', { session: false }),
    kabelValidator.getByWarna,
  ],
  KabelController.getByWarna
);

router.get(
  '/jenis',
  [
    passport.authenticate('karyawan', { session: false }),
    kabelValidator.getByJenis,
  ],
  KabelController.getByJenis
);

router.get(
  '/',
  passport.authenticate('karyawan', { session: false }),
  KabelController.getAll
);

router.put(
  '/:id',
  [
    passport.authenticate('karyawan', { session: false }),
    kabelValidator.update,
  ],
  KabelController.update
);

router.put(
  '/verify/:id',
  [
    passport.authenticate('verificator', { session: false }),
    kabelValidator.verify,
  ],
  KabelController.verify
);

router.delete(
  '/delete/:id',
  [
    passport.authenticate('karyawan', { session: false }),
    kabelValidator.delete,
  ],
  KabelController.delete
);

module.exports = router;
