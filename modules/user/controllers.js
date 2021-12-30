require('dotenv').config()
const db = require("../../models");
const User = db.user;

const error = require('../../helpers/errors')
const cleanObj = require('../../helpers/cleanObj') 

exports.getAll = (req, res) => {
    User.findAll({include: req.includes})
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
    User.create(data)
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

// custom function

exports.login = async (req, res) => {
    User.findOne({
        where: {
            user_email: req.body.user_email,
            user_password: req.body.user_password
        }
    }).then(data => {
        if (data) {
            res.send(data)
        } else
        res.status(400).send({
            message: "User not found"
        }); 
    }).catch(err => {
        error(res, 400, err)
    });
}