const express = require('express');
const router = express.Router();
const {
    createCar,
    getCar,
    deleteCar,
    updateCar,
    renderEjs,
    getCarForView,

} = require('../controllers/cars');
const auth = require('../middleware/auth');


router.get('/new', renderEjs);
router.get('/:id', getCar);
router.patch('/:id',auth, updateCar);
router.delete('/:id',auth, deleteCar);
router.post('/new', createCar);
router.get('cars/view/:id',getCarForView);



module.exports = router;





