const router = require('express').Router()

const controller = require("./controllers");
const {findPengaturan} = require("../../middlewares/findById");
const checkBodyIsEmpty = require('../../middlewares/checkBodyIsEmpty') 

const db = require('../../models/index')

router.get("/", controller.getAll);
router.post("/", checkBodyIsEmpty, controller.create);
router.get("/:pengaturan_id", findPengaturan, controller.get);
router.put("/:pengaturan_id", checkBodyIsEmpty, findPengaturan, controller.update);
router.delete("/:pengaturan_id", findPengaturan, controller.delete);

module.exports = router