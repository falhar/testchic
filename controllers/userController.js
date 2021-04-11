const { users } = require('../models');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

class UserController {
  async signup(user, req, res) {
    const body = {
      username: user.username,
      id: user.id,
    };

    const accesToken = jwt.sign(
      {
        user: body,
      },
      'tokenLogin',
      { expiresIn: '15s' }
    );
    const refreshToken = jwt.sign(
      {
        user: body,
      },
      'secretToken',
      { expiresIn: '7d' }
    );
    await users.update(
      {
        refreshToken,
      },
      {
        where: { id: user.id },
      }
    );
    res.status(200).json({
      message: 'Signup success!',
      accesToken,
      refreshToken,
    });
  }

  async login(user, req, res) {
    const body = {
      username: user.username,
      id: user.id,
    };
    const accesToken = jwt.sign(
      {
        user: body,
      },
      'tokenLogin',
      { expiresIn: '15s' }
    );
    const refreshToken = jwt.sign(
      {
        user: body,
      },
      'secretToken',
      { expiresIn: '7d' }
    );
    await users.update(
      {
        refreshToken,
      },
      {
        where: { id: user.id },
      }
    );
    res.status(200).json({
      message: 'Login success!',
      accesToken,
      refreshToken,
    });
  }

  async token(req, res) {
    try {
      const decoded = jwt.verify(req.body.token, 'secretToken');
      const body = {
        username: decoded.user.username,
        id: decoded.user.id,
      };
      const accesToken = jwt.sign(
        {
          user: body,
        },
        'tokenLogin',
        { expiresIn: '15s' }
      );
      const refreshToken = jwt.sign(
        {
          user: body,
        },
        'secretToken',
        { expiresIn: '7d' }
      );
      await users.update(
        {
          refreshToken,
        },
        {
          where: { id: decoded.user.id },
        }
      );
      res.status(200).json({
        message: 'Success',
        accesToken,
      });
    } catch (error) {
      res.status(422).json({
        status: 'Error!',
        error,
      });
    }
  }
  async getOne(req, res) {
    try {
      const result = await users.findOne({
        where: {
          id: req.user.id,
        },
        attributes: ['username', 'foto', 'role'],
      });

      res.status(200).json({
        status: 'Success get data!',
        data: result,
      });
    } catch (e) {
      res.status(422).json({
        status: 'Error!',
        error: e,
      });
    }
  }

  async getOneOther(req, res) {
    try {
      const result = await users.findOne({
        where: {
          username: req.params.username,
        },
        attributes: ['username', 'foto', 'role'],
      });
      res.status(200).json({
        status: 'Success!',
        data: result,
      });
    } catch (e) {
      res.status(422).json({
        status: 'Error!',
        error: e,
      });
    }
  }

  async update(req, res) {
    try {
      await users.update(
        {
          username: req.body.username,
          foto: req.file === undefined ? undefined : req.file.filename,
        },
        {
          where: {
            id: req.user.id,
          },
        }
      );
      const newUser = await users.findOne({
        where: {
          id: req.user.id,
        },
        attributes: ['username', 'foto', 'role'],
      });
      res.status(200).json({
        status: 'Update Success',
        data: newUser,
      });
    } catch (e) {
      if ((e.code = 'ER_DUP_ENTRY')) {
        res.status(422).json({
          status: 'Error',
          message: 'Username already used!',
        });
      }
      res.status(422).json({
        status: 'Error',
        error: e,
      });
    }
  }

  async delete(req, res) {
    try {
      await users.destroy({
        where: {
          username: req.params.username,
        },
      });
      res.status(200).json({
        status: 'Delete Success',
        message: 'User deleted',
      });
    } catch (e) {
      console.log(e);
      res.status(422).json({
        status: 'Error',
        error: e,
      });
    }
  }

  async restore(req, res) {
    try {
      await users.restore({
        where: {
          username: req.params.username,
        },
      });
      const result = await users.findOne({
        where: {
          username: req.params.username,
        },
        attributes: ['username', 'foto', 'role'],
      });
      res.status(200).json({
        status: 'Restore Success',
        data: result,
      });
    } catch (e) {
      console.log(e);
      res.status(422).json({
        status: 'Error',
        error: e,
      });
    }
  }

  async hard_deleted(req, res) {
    try {
      users.destroy({
        where: {
          username: req.params.username,
        },
        force: true,
      });
      res.status(200).json({
        status: 'Success',
        message: 'User deleted',
      });
    } catch (e) {
      console.log(e);
      res.status(422).json({
        status: 'Error',
        error: e,
      });
    }
  }
}

module.exports = new UserController();
