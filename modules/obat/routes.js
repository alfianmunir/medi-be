const router = require('express').Router()

const controller = require("./controllers");
const {findObat} = require("../../middlewares/findById");
const checkBodyIsEmpty = require('../../middlewares/checkBodyIsEmpty') 
const logsController = require("../logs/controllers");

const db = require('../../models/index')

router.get("/", controller.getAll);
router.get("/sedikit", controller.getStokSedikit);
router.post("/", checkBodyIsEmpty, controller.create);
router.get("/:obat_id", findObat, controller.get);
router.put("/:obat_id", checkBodyIsEmpty, findObat, controller.update, logsController.create);
router.delete("/:obat_id", findObat, controller.delete);

module.exports = router