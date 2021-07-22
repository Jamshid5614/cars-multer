const mongoose = require('mongoose');




const carSchema = new mongoose.Schema({
    model: String,
    brand: String,
    price: Number,
    country: String,
    description: String,
    id: Number,
    img: String,
    imgFileName: String,
    oldImg: String
});

const Cars = mongoose.model('Cars',carSchema);



module.exports = Cars;








































































