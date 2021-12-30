
const router = require('express').Router()

router.use('/pasien', require('../modules/pasien/routes'))
router.use('/obat', require('../modules/obat/routes'))
router.use('/user', require('../modules/user/routes'))
router.use('/pengaturan', require('../modules/pengaturan/routes'))
router.use('/rekam_medis', require('../modules/rekam_medis/routes'))
router.use('/obat_rekam_medis', require('../modules/obat_rekam_medis/routes'))
router.use('/list', require('../modules/wait_list/routes'))
router.use('/log', require('../modules/logs/routes'))

module.exports = router