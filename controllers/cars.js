const CarsModel = require("../models/cars");
const Joi = require("joi");
const fs = require("fs");
const path = require('path');
const port = require("../utils/port");
const sharp = require("sharp");

exports.createCar = async (req, res) => {
  console.log(req.file);
  const schema = Joi.object({
    model: Joi.string().required(),
    brand: Joi.string().required(),
    price: Joi.number().required(),
    country: Joi.string().required(),
    description: Joi.string().required(),
    img: Joi.string(),
  });

  const validateResult = schema.validate(req.body);

  const { error } = validateResult;

  if (error) {
    res.status(400).send({
      success: false,
      message: error.details[0].message,
    });
  } else {
    const filePath = req.file.path;
    sharp(filePath)
      .resize(120, 120)
      .toFile('uploads/','-resized-', req.file.filename, (err, info) => {
        if (error) {
          console.log("error: ", err);
        }
      })
        .then(res => {
            fs.unlink(filePath, (err) => {
              if (err) throw new Error(err);
            });
        })
    const { model, brand, price, country, description } = req.body;
    const carsLength = await CarsModel.find();
    const car = new CarsModel({
      model,
      brand,
      price,
      country,
      description,
      id: carsLength.length + 1,
      img: `http://localhost:${port}/uploads/${req.file.filename}`,
      imgFileName: req.file.filename,
    });
    const savedCar = await car.save();
    res.send({
      success: true,
      data: savedCar,
    });
  }
};

exports.getAllCars = async (req, res) => {
  const cars = await CarsModel.find();
  if (cars) {
    res.json(cars);
  } else {
    res.status(404).send("Cars not found");
  }
};

exports.getCar = async (req, res) => {
  const findedCar = await CarsModel.find({ id: req.params.id });

  if (findedCar) {
    res.json(findedCar);
  } else {
    res.status(404).send("car not found");
  }
};

exports.deleteCar = async (req, res) => {
  const findedCar = await CarsModel.findOne({ id: req.params.id });
  console.log(findedCar.imgFileName);
  fs.unlink(`public/uploads/${findedCar.imgFileName}`, (err) => {
    if (err) {
      console.log("Error: ", err);
    }
  });
  const result = await CarsModel.findOneAndDelete({ id: req.params.id });

  if (result) {
    res.json(result);
  } else {
    res.status(404).send("Car not found");
  }
};

exports.updateCar = async (req, res) => {
  const { model, brand, description, price } = req.body;
  if (req.file) {
    fs.unlink(
      `public/uploads/${req.body.oldImg.slice(29, req.body.oldImg.length)}`,
      (err) => {
        if (err) throw err;
      }
    );
    const result = await CarsModel.updateOne(
      { id: req.params.id },
      {
        model,
        brand,
        description,
        price,
        img: `http://localhost:${port}/${req.file.path}`,
      }
    );
    if (result) {
      const findedCar = await CarsModel.findOne({ id: req.params.id });
      res.json(findedCar);
    } else {
      res.status(404).send("Car not found");
    }
  } else {
    const result = await CarsModel.updateOne(
      { id: req.params.id },
      { model, brand, description, price }
    );
    if (result) {
      const findedCar = await CarsModel.findOne({ id: req.params.id });
      res.json(findedCar);
    } else {
      res.status(404).send("Car not found");
    }
  }
};

exports.getCarForView = async (req, res) => {
  const findedCar = await CarsModel.find({ id: req.params.id });
  res.json(findedCar);
};
