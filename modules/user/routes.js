const router = require('express').Router()

const controller = require("./controllers");
const {findUser} = require("../../middlewares/findById");
const checkBodyIsEmpty = require('../../middlewares/checkBodyIsEmpty') 

const db = require('../../models/index')

router.get("/", controller.getAll);
router.post("/", checkBodyIsEmpty, controller.create);
router.get("/:user_id", findUser, controller.get);
router.put("/:user_id", checkBodyIsEmpty, findUser, controller.update);
router.delete("/:user_id", findUser, controller.delete);

router.post('/login', checkBodyIsEmpty, controller.login)

module.exports = router