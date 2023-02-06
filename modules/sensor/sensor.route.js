const express = require('express');
const router = express.Router();
const sensorController = require('./sensor.controller');
const { auth } = require('../../middleware');

router.post('/', auth, sensorController.createNewSensor);
router.patch('/:id', auth, sensorController.updateSensor);
router.delete('/:id', auth, sensorController.deleteSensor);
router.get('/:id', auth, sensorController.getDetailSensor);
router.get('/get-for-update/:id', auth, sensorController.getSensorForUpdate);

module.exports = router;