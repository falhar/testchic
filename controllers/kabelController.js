const { users, kabels } = require('../models');

class KabelController {
  async create(req, res) {
    try {
      const newKabel = await kabels.create({
        nama: req.body.nama,
        warna: req.body.warna,
        jenis: req.body.jenis,
        panjang: req.body.panjang,
        bending: req.body.bending,
        loss: req.body.loss,
        updator: req.user.id,
        isVerified: 0,
      });

      const result = await kabels.findOne({
        where: { id: newKabel.id },
        include: [
          {
            model: users,
            attributes: ['username'],
            as: 'updatedBy',
          },
        ],
      });
      res.status(200).json({
        status: 'Success',
        data: result,
      });
    } catch (error) {
      console.log(error);
      res.status(422).json({
        status: 'Error!',
        error,
      });
    }
  }
  async getAll(req, res) {
    try {
      const result = await kabels.findAll({
        include: [
          {
            model: users,
            attributes: ['username'],
            as: 'updatedBy',
          },
        ],
      });

      res.status(200).json({
        status: 'Success',
        data: result,
      });
    } catch (error) {
      console.log(error);
      res.status(422).json({
        status: 'Error!',
        error,
      });
    }
  }
  async getByWarna(req, res) {
    try {
      const result = await kabels.findAll({
        where: {
          warna: req.params.warna,
        },
        include: [
          {
            model: users,
            attributes: ['username'],
            as: 'updatedBy',
          },
        ],
      });
      res.status(200).json({
        status: 'Success',
        data: result,
      });
    } catch (error) {
      res.status(422).json({
        status: 'Error!',
        error,
      });
    }
  }
  async getByJenis(req, res) {
    try {
      const result = await kabels.findAll({
        where: {
          jenis: req.body.jenis,
        },
        include: [
          {
            model: users,
            attributes: ['username'],
            as: 'updatedBy',
          },
        ],
      });
      res.status(200).json({
        status: 'Success',
        data: result,
      });
    } catch (error) {
      res.status(422).json({
        status: 'Error!',
        error,
      });
    }
  }
  async update(req, res) {
    try {
      await kabels.update(
        {
          nama: req.body.nama,
          warna: req.body.warna,
          jenis: req.body.jenis,
          panjang: req.body.panjang,
          bending: req.body.bending,
          loss: req.body.loss,
          updator: req.user.id,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      const result = await kabels.findOne({
        where: { id: req.params.id },
      });
      res.status(200).json({
        status: 'Success',
        data: result,
      });
    } catch (error) {
      res.status(422).json({
        status: 'Error!',
        error,
      });
    }
  }
  async verify(req, res) {
    try {
      const data = await kabels.update(
        {
          isVerified: true,
        },
        {
          where: { id: req.params.id },
        }
      );
      const result = await kabels.findOne({
        where: { id: req.params.id },
        include: [
          {
            model: users,
            attributes: ['username'],
            as: 'updatedBy',
          },
        ],
      });
      res.status(200).json({
        status: 'Success',
        data: result,
      });
    } catch (error) {
      res.status(422).json({
        status: 'Error!',
        error,
      });
    }
  }

  async delete(req, res) {
    try {
      await kabels.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json({
        status: 'Delete Success',
        message: 'Kabel deleted',
      });
    } catch (error) {
      res.status(422).json({
        status: 'Error!',
        error,
      });
    }
  }
}

module.exports = new KabelController();
