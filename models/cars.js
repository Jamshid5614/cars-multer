const mongoose = require('mongoose');




const carSchema = new mongoose.Schema({
    model: String,
    brand: String,
    price: Number,
    country: String,
    description: String,
    id: Number
});

const Cars = mongoose.model('Cars',carSchema);



module.exports = Cars;








































































