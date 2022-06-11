const Router = require("express")
const router = new Router()
const connectController = require('../controllers/connectController')
const checkRole = require("../middleware/checkRoleMiddleware");

router.post('/',connectController.create)
router.get('/', checkRole('ADMIN'), connectController.getAll)
router.delete('/', checkRole("ADMIN"), connectController.delete)

module.exports = router