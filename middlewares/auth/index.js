const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const { users } = require('../../models');
const bcrypt = require('bcrypt');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

passport.use(
  'signup',
  new localStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      try {
        // Create new user with email, password and role
        let createdUser = await users.create({
          username,
          password,
          role: req.body.role,
        });
        // Find new user that have been created in advance
        let newUser = await users.findOne({
          where: {
            id: createdUser.id,
          },
          attributes: ['id', 'username', 'role'],
        });

        // If success, it will return newUser variable that can be used in the next step
        return done(null, newUser, {
          message: 'Signup success!',
        });
      } catch (err) {
        console.log(err);
        if (err) {
          if (err.code == 'ER_DUP_ENTRY') {
            return done(null, false, {
              message: 'Username or Email already used!',
            });
          } else {
            return done(null, false, {
              message: 'User failed to created!',
            });
          }
        }
      }
    }
  )
);

passport.use(
  'login',
  new localStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
    },
    async (username, password, done) => {
      const userLogin = await users.findOne({
        where: {
          username: username,
        },
      });
      if (!userLogin) {
        return done(null, false, {
          message: 'User not found!',
        });
      }
      const validate = await bcrypt.compare(password, userLogin.password);

      if (!validate) {
        return done(null, false, {
          message: 'Wrong password!',
        });
      }
      if (userLogin) {
        return done(null, userLogin);
      }
    }
  )
);

passport.use(
  'admin',
  new JWTstrategy(
    {
      secretOrKey: 'tokenLogin',
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      passReqToCallback: true,
    },
    async (req, token, done) => {
      console.log(req);
      console.log('token', token);
      const userLogin = await users.findOne({
        where: {
          id: token.user.id,
        },
        attributes: ['id', 'username', 'role'],
      });
      console.log(userLogin);

      if (userLogin.role == 'admin') {
        return done(null, userLogin);
      }
      return done(null, false);
    }
  )
);

passport.use(
  'karyawan',
  new JWTstrategy(
    {
      secretOrKey: 'tokenLogin',
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      passReqToCallback: true,
    },
    async (req, token, done) => {
      try {
        const userLogin = await users.findOne({
          where: {
            id: token.user.id,
          },
        });
        if (!userLogin) {
          return done(null, false, {
            message: 'User not found!',
          });
        }
        if (userLogin) {
          return done(null, token.user);
        }
      } catch (e) {
        // If error, it will create this message
        return done(null, false, {
          message: 'Unauthorized!',
        });
      }
    }
  )
);

passport.use(
  'verificator',
  new JWTstrategy(
    {
      secretOrKey: 'tokenLogin',
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      passReqToCallback: true,
    },
    async (req, token, done) => {
      try {
        console.log(token);
        const userLogin = await users.findOne({
          where: {
            id: token.user.id,
          },
          attributes: ['id', 'username', 'role'],
        });
        console.log(userLogin);

        if (userLogin.role == 'verificator') {
          return done(null, userLogin);
        }
        return done(null, false);
      } catch (e) {
        return done(null, false, {
          message: 'Unauthorized!',
        });
      }
    }
  )
);
