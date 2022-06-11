const Router = require("express")
const router = new Router()
const historyAllController = require('../controllers/historyAllController')

router.post('/',historyAllController.create)
router.get('/',historyAllController.getAll)

module.exports = router