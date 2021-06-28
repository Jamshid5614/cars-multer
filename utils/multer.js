const multer = require('multer');





const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads');
    },
    filename: function (req, file, cb) {
        if(file.mimetype !== 'image/png' || file.mimetype !== 'image/jpeg') {
            cb(new Error("malumot turi jpeg/png formatida bo'lishi kerak"));
        } else {
            cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname);
        }
    }
})

const upload = multer({ storage: storage });


module.exports = upload;













