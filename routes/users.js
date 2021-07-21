const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const upload = require('../utils/multer');
const {
    signIn,
    signUp,
    updateProfile,
    getProfile
} = require('../controllers/users');




router.post('/sign-in',signIn);
router.post('/sign-up',signUp);
router.patch('/profile/:id',upload.single('img'),updateProfile);
router.post('/profile',auth,getProfile);




module.exports = router;


