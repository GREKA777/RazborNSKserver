const Router = require("express")
const router = new Router()
const ordersController = require('../controllers/ordersController')

router.post('/', ordersController.create)
router.get('/', ordersController.getAll)

module.exports = router