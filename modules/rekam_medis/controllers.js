require('dotenv').config()
const db = require("../../models");
const RekamMedis = db.rekam_medis;
const {Op} = require('sequelize')
const Pengaturan = db.pengaturan;

const error = require('../../helpers/errors')
const cleanObj = require('../../helpers/cleanObj') 

exports.getAll = (req, res) => {
    RekamMedis.findAll({include: req.includes})
        .then(datas => {
            res.send(datas)
        }).catch(err => {
            error(res, 400, err)
        });
}

exports.getAllByPasien = (req, res) => {
    RekamMedis.findAll({include: req.includes, where: {
        rm_pasien_id: {
            [Op.eq] : req.data.pasien_id
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
    Pengaturan.findOne({
        where: {
            pengaturan_key: 'fee_berobat'
        }
    }).then(pengaturan => {
        const data = {...req.body, rm_fee_berobat: parseInt(pengaturan.pengaturan_value)}
        RekamMedis.create(data)
            .then(data => {
                res.send({ data });
            })
            .catch(err => {
                error(res, 500, err)
            });
    })
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