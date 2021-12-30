const router = require('express').Router()

const controller = require("./controllers");
const {findPasien} = require("../../middlewares/findById");
const checkBodyIsEmpty = require('../../middlewares/checkBodyIsEmpty') 

const db = require('../../models/index')

const setIncludes = (req, res, next) => {
    req.includes = [
        db.rekam_medis
    ]
    next()
}

router.get("/", controller.getAll);
router.post("/", checkBodyIsEmpty, controller.create);
router.get("/:pasien_id", findPasien, controller.get);
router.get("/:pasien_id/rekam_medis", setIncludes, findPasien, controller.get);
router.put("/:pasien_id", checkBodyIsEmpty, findPasien, controller.update);
router.delete("/:pasien_id", findPasien, controller.delete);

module.exports = router