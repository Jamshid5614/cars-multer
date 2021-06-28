const CarsModel = require('../models/cars');
const Joi = require('joi');


exports.createCar = async (req, res) => {
    console.log(req.body);
    console.log(req.query);
    const schema = Joi.object({
        model: Joi.string().required(),
        brand: Joi.string().required(),
        price: Joi.number().required(),
        country: Joi.string().required(),
        description: Joi.string().required()
    });

    const validateResult = schema.validate(req.body);

    const { error } = validateResult;

    if (error) {
        res.status(400).send({
            success: false,
            message: error.details[0].message
        });
    } else {
        const { model, brand, price, country, description } = req.body;
        const carsLength = await CarsModel.find();
        const car = new CarsModel({
            model,
            brand,
            price,
            country,
            description,
            id: carsLength.length + 1
        });
        const savedCar = await car.save();
        res.send({
            success: true,
            data: savedCar
        });
    }


};

exports.renderEjs = async (req, res) => {

    res.render('addCar');

};

exports.getCar = async (req, res) => {

    const findedCar = await CarsModel.find({ id: req.params.id });

    if (findedCar) {
        res.render('selectedCar', { car: findedCar });
    } else {
        res.status(404).send('car not found');
    }

};

exports.deleteCar = async (req, res) => {

    const result = await CarsModel.findOneAndDelete({ id: req.params.id });

    if (result) {
        res.send(result);
    } else {
        res.status(404).send('Car not found');
    }


};

exports.updateCar = async (req, res) => {

    const result = await CarsModel.updateOne({ id: req.params.id }, req.body);

    if (result) {
        res.send(result);
    } else {
        res.status(404).send('Car not found');
    }

};

exports.getCarForView = async (req, res) => {
    const findedCar = await CarsModel.find({ _id: req.params.id });
    res.render('viewCar', { car: findedCar });
};




