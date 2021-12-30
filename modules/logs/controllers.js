require('dotenv').config()
const db = require("../../models");
const Logs = db.logs;

const error = require('../../helpers/errors')
const cleanObj = require('../../helpers/cleanObj') 

exports.getAll = (req, res) => {
    Logs.findAll({include: req.includes, order: [
        ['log_id', 'DESC'], 
    ],})
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
    const data = req.log
    Logs.create(data)
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