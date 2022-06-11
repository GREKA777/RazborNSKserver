const Router = require("express")
const router = new Router()
const basketAllController = require('../controllers/basketAllController')

router.post('/',basketAllController.create)
router.get('/',basketAllController.getAll)

module.exports = router