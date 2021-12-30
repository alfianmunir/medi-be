require('dotenv').config()
const db = require("../../models");
const ObatRekamMedis = db.obat_rekam_medis;
const Obat = db.obat;
const Pengaturan = db.pengaturan;
const RekamMedis = db.rekam_medis;
const moment = require('moment')

const error = require('../../helpers/errors')
const cleanObj = require('../../helpers/cleanObj'); 
const { sequelize } = require('../../models');

exports.getAll = (req, res) => {
    ObatRekamMedis.findAll({include: req.includes})
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
    Obat.findOne({
        where: {
            obat_id: data.orm_obat_id
        }
    }).then(async obat => {
        if (obat) {
            await obat.update({obat_stok: obat.obat_stok - data.orm_obat_strip})
                .then(data_obat => {
                    Pengaturan.findOne({
                        where: {
                            pengaturan_key: 'fee_berobat'
                        }
                    }).then(pengaturan => {
                        const harga = (parseInt(data.orm_obat_strip) * parseFloat(obat.obat_harga)) + parseInt(pengaturan.pengaturan_value)
                        ObatRekamMedis.create({...data, orm_total_harga: harga, orm_obat_harga: (parseInt(data.orm_obat_strip) * parseFloat(obat.obat_harga)), orm_fee_berobat: parseInt(pengaturan.pengaturan_value)})
                            .then(data => {
                                res.send({ orm: data, obat: data_obat });
                            }) .catch(err => {
                                error(res, 500, err)
                            });
                    })
                })
        }
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

// statistics 
exports.getBerbatStatistics = async (req, res) => {
    sequelize.query(`
    select date, sum(fee_berobat) as harga from (
        select rm_date, sum(rm_fee_berobat) as fee_berobat,
        EXTRACT(DAY FROM rm_date) as date
        from rekam_medis 
        where EXTRACT(MONTH FROM rm_date) = ${req.query.month_id} and EXTRACT('year' from rm_date)=${req.query.year}
        group by rm_date) A
    group by date`, { type: sequelize.QueryTypes.SELECT})
    .then(fee => {
        sequelize.query(`
        select sum(harga) as total from (
            select date, sum(fee_berobat) as harga from (
                select rm_date, sum(rm_fee_berobat) as fee_berobat,
                EXTRACT(DAY FROM rm_date) as date
                from rekam_medis 
                where EXTRACT(MONTH FROM rm_date) = ${req.query.month_id} and EXTRACT('year' from rm_date)=${req.query.year}
                group by rm_date) A
            group by date) B
        `, { type: sequelize.QueryTypes.SELECT})
            .then(total => {
                res.send({data:fee, total:total[0].total})
            })
    }).catch(err => {
        error(res, 400, err)
    });
}
exports.getObatStatistics = async (req, res) => {
    sequelize.query(`
    select date, sum(harga_obat) as harga from (
    select orm_date, sum(orm_obat_harga) as harga_obat,
    EXTRACT(DAY FROM orm_date) as date
    from obat_rekam_medis 
    where EXTRACT(MONTH FROM orm_date) = ${req.query.month_id} and EXTRACT('year' from orm_date)=${req.query.year}
    group by orm_date) A
    group by date`, { type: sequelize.QueryTypes.SELECT})
        .then(obats => {
            sequelize.query(`
            select sum(harga) as total from (
                select date, sum(harga_obat) as harga from (
                    select orm_date, sum(orm_obat_harga) as harga_obat,
                    EXTRACT(DAY FROM orm_date) as date
                    from obat_rekam_medis 
                    where EXTRACT(MONTH FROM orm_date) = ${req.query.month_id} and EXTRACT('year' from orm_date)=${req.query.year}
                    group by orm_date) A
                group by date) B
            `, { type: sequelize.QueryTypes.SELECT})
                .then(total => {

                    res.send({data:obats,total:total[0].total})
                })
        }).catch(err => {
            error(res, 400, err)
        });
        
}

exports.getPasienStatistics = async (req, res) => {
    sequelize.query(`
    select  tanggal, count(tanggal) as pasiens from (
        select rm_date,
        EXTRACT(DAY FROM rm_date) as tanggal
        from rekam_medis
        where EXTRACT(MONTH FROM rm_date) = ${req.query.month_id} and EXTRACT('year' from rm_date)=${req.query.year}
        group by rm_date
    ) A
    group by tanggal`, { type: sequelize.QueryTypes.SELECT})
    .then(pasien => {
        sequelize.query(`
        select sum(pasiens) as total from
        (select  tanggal, count(tanggal) as pasiens from (
            select rm_date,
            EXTRACT(DAY FROM rm_date) as tanggal
            from rekam_medis
            where EXTRACT(MONTH FROM rm_date) = ${req.query.month_id} and EXTRACT('year' from rm_date)=${req.query.year}
            group by rm_date
        ) A
        group by tanggal) B
        `, { type: sequelize.QueryTypes.SELECT})
            .then(total => {
                res.send({data:pasien, total:total[0].total})
            })
            .catch(err => {
                error(res, 400, err)
            })
    }).catch(err => {
        error(res, 400, err)
    })
}