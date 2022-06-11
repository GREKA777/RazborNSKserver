const Router = require("express")
const router = new Router()
const historyController = require('../controllers/historyController')

router.post('/',historyController.create)
router.get('/',historyController.getAll)
router.get('/getOne',historyController.getOne)
router.delete('/',historyController.delete)
router.delete('/all',historyController.deleteAll)

module.exports = router