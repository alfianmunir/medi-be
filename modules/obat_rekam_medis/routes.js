const router = require('express').Router()

const controller = require("./controllers");
const {findObatRekamMedis} = require("../../middlewares/findById");
const checkBodyIsEmpty = require('../../middlewares/checkBodyIsEmpty') 

const db = require('../../models/index')

router.get("/", controller.getAll);
router.get("/statistics/obat", controller.getObatStatistics);
router.get("/statistics/fee", controller.getBerbatStatistics);
router.get("/statistics/pasien", controller.getPasienStatistics);
router.post("/", checkBodyIsEmpty, controller.create);
router.get("/:orm_id", findObatRekamMedis, controller.get);
router.put("/:orm_id", checkBodyIsEmpty, findObatRekamMedis, controller.update);
router.delete("/:orm_id", findObatRekamMedis, controller.delete);

module.exports = router