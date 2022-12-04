const express = require("express");
// const { check } = require('express-validator');
const router = express.Router();

const postController = require("../controllers/userdataController");

router.post("/getdetails", postController.getdetails);

module.exports = router;
