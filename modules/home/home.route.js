const express = require('express');
const router = express.Router();
const homeController = require('./home.controller');
const { auth } = require('../../middleware');

router.post('/', auth, homeController.createNewHome);
router.patch('/:id', auth, homeController.updateHome);
router.get('/', homeController.getAllHome);

router.delete('/:id/:userId', auth, homeController.deleteHome);
router.get('/:id', auth, homeController.getDetailHome);
router.get('/get-for-update/:id', auth, homeController.getHomeForUpdate);
router.get('/devices-of-home/:id', auth, homeController.getDevicesOfHome);
router.get('/sensors-of-home/:id', auth, homeController.getSensorsOfHome);

module.exports = router;