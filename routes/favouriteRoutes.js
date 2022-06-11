const Router = require("express")
const router = new Router()
const favouriteController = require('../controllers/favouriteController')

router.post('/',favouriteController.create)
router.get('/',favouriteController.getAll)
router.get('/getOne',favouriteController.getOne)
router.delete('/',favouriteController.delete)
router.delete('/all',favouriteController.deleteAll)

module.exports = router