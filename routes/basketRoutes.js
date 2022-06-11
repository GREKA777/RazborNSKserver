const Router = require("express")
const router = new Router()
const basketController = require('../controllers/basketController')

router.post('/',basketController.create)
router.get('/',basketController.getAll)
router.get('/getOne',basketController.getOne)
router.delete('/',basketController.delete)
router.delete('/all',basketController.deleteAll)

module.exports = router