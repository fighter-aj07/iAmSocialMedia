
const multer = require("multer");

const storage = multer.memoryStorage();
console.log("**************** stprage ", storage);
const singleUpload = multer({ storage }).single("file");
console.log("**************** singleUpload ", singleUpload);
module.exports = singleUpload;
