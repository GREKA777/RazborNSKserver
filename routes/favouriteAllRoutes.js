const Router = require("express")
const router = new Router()
const favouriteAllController = require('../controllers/favouriteAllController')

router.post('/',favouriteAllController.create)
router.get('/',favouriteAllController.getAll)

module.exports = router