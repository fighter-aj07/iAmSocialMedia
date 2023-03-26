const DataUriParser = require("datauri/parser.js");
const path = require("path");
const getDataUri = (file) => {
  // console.log("4 ", file);
  const parser = new DataUriParser();
  const extName = path.extname(file.originalname).toString();
  // console.log("**************** extename ", extName);
  return parser.format(extName, file.buffer);
};

module.exports = getDataUri;
