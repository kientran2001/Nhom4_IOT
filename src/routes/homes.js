const express = require('express')
const router = express.Router()

const homeController = require('../app/controllers/HomeController')

router.post('/create', homeController.create)
router.get('/:slug', homeController.show)
router.put('/:id', homeController.update)
router.delete('/:id', homeController.delete)

module.exports = router
