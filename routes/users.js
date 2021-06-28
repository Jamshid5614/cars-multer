const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
    signIn,
    renderSignInEjs,
    signUp,
    renderSigupnEjs,
    updateProfile,
    renderProfileEjs,
    getProfile
} = require('../controllers/users');




router.post('/sign-in',signIn);
router.post('/sign-up',signUp);
router.patch('/profile/:id',auth,updateProfile);
router.get('/sign-in',renderSignInEjs);
router.get('/sign-up',renderSigupnEjs);
router.get('/profile',renderProfileEjs);
router.post('/profile',auth,getProfile);



module.exports = router;


