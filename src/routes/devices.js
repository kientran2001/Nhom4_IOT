const express = require('express')
const router = express.Router()

const deviceController = require('../app/controllers/DeviceController')

router.post('/create', deviceController.create)
router.get('/:slug', deviceController.show)
router.put('/:id', deviceController.update)
router.delete('/:id', deviceController.delete)

module.exports = router
