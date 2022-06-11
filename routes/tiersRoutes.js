const Router = require("express")
const router = new Router()
const tiersController = require('../controllers/tiersController')
const checkRole = require("../middleware/checkRoleMiddleware");
const autoPartController = require("../controllers/autoPartController");

router.post('/', checkRole('ADMIN'), tiersController.create)
router.get('/', tiersController.getAll)
router.get('/recommend', tiersController.getRecommendation)
router.get('/:id', tiersController.getOne)
router.delete('/', checkRole("ADMIN"), tiersController.delete)

module.exports = router