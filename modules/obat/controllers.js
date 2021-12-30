require('dotenv').config()
const db = require("../../models");
const Obat = db.obat;
const { Op } = require("sequelize");

const error = require('../../helpers/errors')
const cleanObj = require('../../helpers/cleanObj') 

exports.getAll = (req, res) => {
    Obat.findAll({include: req.includes, order: [['obat_id', 'ASC']]})
        .then(datas => {
            res.send(datas)
        }).catch(err => {
            error(res, 400, err)
        });
}

exports.getStokSedikit = (req, res) => {
    Obat.findAll({include: req.includes, where: {
        obat_stok: {
            [Op.lte]: 10
        }
    }})
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
    Obat.create(data)
        .then(data => {
            res.send({ data });
        })
        .catch(err => {
            error(res, 500, err)
        });
}

exports.update = async (req, res, next) => { 
    await req.data.update(req.body)
        .then(data => {
            if(data.obat_stok <= 10){
                req.log = {
                    log_src: 'obat',
                    log_title: `Stok ${data.obat_stok} tersisa ${data.obat_stok}`,
                    log_subtitle: 'Update stok sekarang!',
                    log_date: (new Date()).toLocaleString()
                }
                next()
            } else
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