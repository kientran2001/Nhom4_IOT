const express = require('express')
const router = express.Router()

const sensorController = require('../app/controllers/SensorController')

router.post('/create', sensorController.create)
router.get('/:slug', sensorController.show)
router.put('/:id', sensorController.update)
router.delete('/:id', sensorController.delete)

module.exports = router
