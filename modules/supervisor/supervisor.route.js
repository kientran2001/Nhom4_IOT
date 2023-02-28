const express = require('express');
const router = express.Router();
const supervisorController = require('./supervisor.controller');
const { auth } = require('../../middleware');

router.post('/', auth, supervisorController.createNewsupervisor);
router.get('/', auth, supervisorController.getAllSupervisors);
router.get('/fiveRecentSupervisors', auth, supervisorController.getFiveRecentSupervisors);
router.get('/:id', auth, supervisorController.getSupervisorDetail);

module.exports = router;