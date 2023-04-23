const express = require("express");
// const { check } = require('express-validator');
const router = express.Router();

const profileController = require("../controllers/profileController");
const singleUpload = require("../middlewares/multer");

router.post("/getprofiles", profileController.getprofiles);
router.post("/getprof", profileController.getprof);
router.post("/updateProfile", profileController.updateProfile);
router.post(
  "/updateProfilePicture",
  singleUpload,
  profileController.updateProfilePicture
);
router.post("/addFriend", profileController.addFriend);

module.exports = router;
