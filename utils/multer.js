const multer = require("multer");
const { nanoid } = require("nanoid");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/jpg"
    ) {
      cb(null, "public/uploads");
    } else {
      cb("picture png/jpeg must be in format");
    }
  },
  filename: function (req, file, cb) {
    cb(null, nanoid(15) + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
