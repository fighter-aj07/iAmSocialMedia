const express = require("express");
// const { check } = require('express-validator');
const router = express.Router();

const postController = require("../controllers/postController");

router.get("/getposts", postController.getposts);
router.post("/addpost", postController.addpost);
router.post("/likeupdate", postController.likeupdate);
router.post("/updatepostscomment", postController.updatepostscomment);
module.exports = router;
