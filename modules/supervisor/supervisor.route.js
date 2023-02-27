const express = require('express');
const router = express.Router();
const supervisorController = require('./supervisor.controller');
const { auth } = require('../../middleware');


module.exports = router;