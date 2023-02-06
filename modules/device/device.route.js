const express = require('express');
const router = express.Router();
const deviceController = require('./device.controller');
const { auth } = require('../../middleware');

router.post('/', auth, deviceController.createNewDevice);
router.patch('/:id', auth, deviceController.updateDevice);
router.delete('/:id/:homeId', auth, deviceController.deleteDevice);
router.get('/:id', auth, deviceController.getDetailDevice);
router.get('/get-for-update/:id', auth, deviceController.getDeviceForUpdate);

module.exports = router;