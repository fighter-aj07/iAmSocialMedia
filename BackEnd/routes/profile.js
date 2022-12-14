const express = require("express");
// const { check } = require('express-validator');
const router = express.Router();

const profileController = require("../controllers/profileController");

router.post("/getprofiles", profileController.getprofiles);
router.post("/getprof", profileController.getprof);
router.post("/updateProfile", profileController.updateProfile);

module.exports = router;
