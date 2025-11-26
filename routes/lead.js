const express = require('express');
const router = express.Router();
const leadController = require("../controller/lead");

router.post("/createLead", leadController.createLead);

module.exports = router;