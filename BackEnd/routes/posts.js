const express = require("express");
// const { check } = require('express-validator');
const router = express.Router();

const postController = require("../controllers/postController");

router.post("/getposts", postController.getposts);
router.post("/addpost", postController.addpost);

module.exports = router;
