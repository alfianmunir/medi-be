const router = require('express').Router()

const controller = require("./controllers");
const {findLog} = require("../../middlewares/findById");
const checkBodyIsEmpty = require('../../middlewares/checkBodyIsEmpty') 

const db = require('../../models/index')

router.get("/", controller.getAll);
router.post("/", checkBodyIsEmpty, controller.create);
router.get("/:log_id", findLog, controller.get);
router.put("/:log_id", checkBodyIsEmpty, findLog, controller.update);
router.delete("/:log_id", findLog, controller.delete);

module.exports = router