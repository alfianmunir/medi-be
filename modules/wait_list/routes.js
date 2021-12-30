const router = require('express').Router()

const controller = require("./controllers");
const logsController = require("../logs/controllers");
const {findList} = require("../../middlewares/findById");
const checkBodyIsEmpty = require('../../middlewares/checkBodyIsEmpty') 

const db = require('../../models/index')

const setIncludes = (req, res, next) => {
    req.includes = [
        db.pasien, {model: db.rekam_medis, include: [db.obat]}, db.rekam_medis
    ]
    next()
}

router.get("/status/:wl_status", setIncludes, controller.getAll);

router.post("/", checkBodyIsEmpty, controller.create);
router.get("/:wl_id", findList, controller.get);
router.put("/:wl_id", checkBodyIsEmpty, findList, controller.update, logsController.create);
router.delete("/:wl_id", findList, controller.delete);

module.exports = router