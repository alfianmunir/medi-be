require('dotenv').config()
const db = require("../../models");
const WaitList = db.wait_list;
const Pasien = db.pasien;
const RekamMedis = db.rekam_medis;
const { Op } = require("sequelize");
const Pengaturan = db.pengaturan;
const Logs = db.logs

const error = require('../../helpers/errors')
const cleanObj = require('../../helpers/cleanObj') 

exports.getAll = (req, res) => {
    WaitList.findAll({include: req.includes, where: {
        wl_status: {
            [Op.eq] : req.params.wl_status
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
    WaitList.create(data)
        .then(list => {
            Pasien.findOne({
                where: {
                    pasien_id: list.wl_pasien_id
                } 
            }).then(async data => {
                if (data) {
                    await data.update({pasien_lastarrival : (new Date()).toLocaleString()}).then(() => {
                        res.send({ list });
                    })
                } else
                res.status(400).send({
                    message: "Pasien not found"
                }); 
            }) 
        })
        .catch(err => {
            error(res, 500, err)
        });
}

exports.update = async (req, res, next) => {
    if(req.body.wl_status == 'wait' && req.data.wl_status == 'periksa'){
        await req.data.update(req.body)
            .then(data => { 
                req.log = {
                    log_src: 'wait_list',
                    log_title: `Pasien dengan No. Kartu ${data.wl_pasien_id} dibatalkan pemeriksaannya`,
                    log_subtitle: 'Dikembalikan ke ruang tunggu',
                    log_date: (new Date()).toLocaleString()
                }
                next()  
            })
            .catch(err => {
                error(res, 500, err)
            });
    }
    else if(req.body.wl_status == 'periksa'){
        Pengaturan.findOne({
            where: {
                pengaturan_key: 'fee_berobat'
            }
        }).then(pengaturan => {
            RekamMedis.create({
                rm_pasien_id: req.data.wl_pasien_id, rm_fee_berobat: parseInt(pengaturan.pengaturan_value)
            }).then(async rm => {
                await req.data.update({...req.body, wl_rm_id: rm.rm_id})
                    .then(data => {
                        res.send({ data });
                    })
                    .catch(err => {
                        error(res, 500, err)
                    });
            })
        })
    } else {
        await req.data.update(req.body)
            .then(data => {
                if(data.wl_status == 'done'){
                    req.log = {
                        log_src: 'wait_list',
                        log_title: `Pasien dengan No. Kartu ${data.wl_pasien_id} telah selesai berobat`,
                        log_subtitle: 'Lanjut ke pasien berikutnya',
                        log_date: (new Date()).toLocaleString()
                    }
                    next()
                }
                res.send({ data });
            })
            .catch(err => {
                error(res, 500, err)
            });
    }
}

exports.delete = async (req, res) => {
    await req.data.destroy().then(data => {
        res.send({ data });
    })
    .catch(err => {
        error(res, 500, err)
    });
}