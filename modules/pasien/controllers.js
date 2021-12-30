require('dotenv').config()
const db = require("../../models");
const Pasien = db.pasien; 

const error = require('../../helpers/errors')
const cleanObj = require('../../helpers/cleanObj') 

exports.getAll = (req, res) => {
    Pasien.findAll({include: req.includes, order: [['pasien_id', 'ASC']]})
        .then(datas => {
            res.send(datas)
        }).catch(err => {
            error(res, 400, err)
        });
}

exports.get = (req, res) => {
    res.send(req.data)
}

exports.create = (req, res, next) => {
    const data = req.body
    Pasien.create(data)
        .then(data => {
            res.send({ data });
        })
        .catch(err => {
            error(res, 500, err)
        });
}

exports.update = async (req, res) => { 
    await req.data.update(req.body)
        .then(data => {
            res.send({ data });
        })
        .catch(err => {
            error(res, 500, err)
        });
}

exports.delete = async (req, res) => {
    await req.data.destroy().then(data => {
        res.send({ data });
    })
    .catch(err => {
        error(res, 500, err)
    });
}
