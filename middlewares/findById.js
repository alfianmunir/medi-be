const db = require("../models");
const Pasien = db.pasien;
const Obat = db.obat;
const User = db.user;
const Pengaturan = db.pengaturan;
const RekamMedis = db.rekam_medis;
const ObatRekamMedis = db.obat_rekam_medis;
const WaitList = db.wait_list;
const Logs = db.logs;

const error = require('../helpers/errors')

const findPasien  = (req, res, next) => {
    Pasien.findOne({
        where: {
            pasien_id: req.params.pasien_id
        }, include: req.includes
    }).then(data => {
        if (data) {
            req.data = data
            next()
        } else
        res.status(400).send({
            message: "Pasien not found"
        }); 
    }).catch(err => {
        error(res, 400, err)
    });
}

const findObat  = (req, res, next) => {
    Obat.findOne({
        where: {
            obat_id: req.params.obat_id
        }, include: req.includes
    }).then(data => {
        if (data) {
            req.data = data
            next()
        } else
        res.status(400).send({
            message: "Obat not found"
        }); 
    }).catch(err => {
        error(res, 400, err)
    });
}

const findUser  = (req, res, next) => {
    User.findOne({
        where: {
            user_id: req.params.user_id
        }, include: req.includes
    }).then(data => {
        if (data) {
            req.data = data
            next()
        } else
        res.status(400).send({
            message: "User not found"
        }); 
    }).catch(err => {
        error(res, 400, err)
    });
}

const findPengaturan  = (req, res, next) => {
    Pengaturan.findOne({
        where: {
            pengaturan_key: req.params.pengaturan_id
        }, include: req.includes
    }).then(data => {
        if (data) {
            req.data = data
            next()
        } else
        res.status(400).send({
            message: "Pengaturan not found"
        }); 
    }).catch(err => {
        error(res, 400, err)
    });
}

const findLog  = (req, res, next) => {
    Logs.findOne({
        where: {
            log_id: req.params.log_id
        }, include: req.includes
    }).then(data => {
        if (data) {
            req.data = data
            next()
        } else
        res.status(400).send({
            message: "Log not found"
        }); 
    }).catch(err => {
        error(res, 400, err)
    });
}

const findList  = (req, res, next) => {
    WaitList.findOne({
        where: {
            wl_id: req.params.wl_id
        }, include: req.includes
    }).then(data => {
        if (data) {
            req.data = data
            next()
        } else
        res.status(400).send({
            message: "List not found"
        }); 
    }).catch(err => {
        error(res, 400, err)
    });
}

const findRekamMedis  = (req, res, next) => {
    RekamMedis.findOne({
        where: {
            rm_id: req.params.rm_id
        }, include: req.includes
    }).then(data => {
        if (data) {
            req.data = data
            next()
        } else
        res.status(400).send({
            message: "Rekam Medis not found"
        }); 
    }).catch(err => {
        error(res, 400, err)
    });
}

const findObatRekamMedis = (req, res, next) => {
    ObatRekamMedis.findOne({
        where: {
            orm_id: req.params.orm_id
        }, include: req.includes
    }).then(data => {
        if (data) {
            req.data = data
            next()
        } else
        res.status(400).send({
            message: "Obat Rekam Medis not found"
        }); 
    }).catch(err => {
        error(res, 400, err)
    });
}

module.exports = {
    findPasien, findObat, findUser, findPengaturan, findRekamMedis, findObatRekamMedis, findList, findLog
}