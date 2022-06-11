const Router = require("express")
const router = new Router()
const orderDataController = require('../controllers/orderDataController')

router.post('/', orderDataController.create)
router.get('/',orderDataController.getAll)
router.get('/:id', orderDataController.getOne)

module.exports = router