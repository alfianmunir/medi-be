const router = require('express').Router()

const controller = require("./controllers");
const {findRekamMedis, findPasien} = require("../../middlewares/findById");
const checkBodyIsEmpty = require('../../middlewares/checkBodyIsEmpty') 

const db = require('../../models/index')

const setIncludes = (req, res, next) => {
    req.includes = [
        db.obat
    ]
    next()
}

router.get("/", setIncludes, controller.getAll);
router.get("/pasien/:pasien_id", findPasien, setIncludes, controller.getAllByPasien);
router.post("/", checkBodyIsEmpty, controller.create);
router.get("/:rm_id", setIncludes, findRekamMedis, controller.get);
router.put("/:rm_id", checkBodyIsEmpty, findRekamMedis, controller.update);
router.delete("/:rm_id", findRekamMedis, controller.delete);

module.exports = router