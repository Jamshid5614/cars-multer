const UsersModel = require("../models/users");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");
const key = process.env.JWTPRIVATEKEY;
const port = require("../utils/port");

exports.signIn = async (req, res) => {
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  });

  const validateResult = schema.validate(req.body);

  const { error } = validateResult;

  if (!error) {
    const { email, password } = req.body;
    const findedUser = await UsersModel.findOne({
      email: email,
      password: password,
    });
    if (!findedUser) {
      res.send({
        success: false,
        message: "Email or password is wrong",
      });
    } else {
      const token = jwt.sign({ _id: findedUser._id }, key);
      res.send({
        token,
        success: true,
        data: findedUser,
      });
    }
  } else {
    res.status(400).send({
      success: false,
      message: error.details[0].message,
    });
  }
};

exports.signUp = async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
  });

  const validateResult = schema.validate(req.body);

  const { error } = validateResult;

  if (!error) {
    const inspection = await UsersModel.find({ email: req.body.email });
    if (!inspection || inspection.length == 0) {
      const user = new UsersModel(req.body);
      const savedUser = await user.save();
      const token = jwt.sign({ _id: savedUser._id }, key);

      res.send({
        token,
        success: true,
        data: savedUser,
      });
    } else {
      res.send({
        success: false,
        message: "Email already taken, please enter enother Email",
      });
    }
  } else {
    res.status(400).send({
      success: false,
      message: error.details[0].message,
    });
  }
};

exports.updateProfile = async (req, res) => {
  const result = await UsersModel.findOne({ _id: req.params.id });
  if (result) {
    const updatedUser = await UsersModel.updateOne(
      { _id: req.params.id },
      { ...req.body }
    );
    const findedUser = await UsersModel.findOne({ _id: req.params.id });
    res.json({
        success: true,
        data: findedUser
    });
  } else {
    res.status(404).send('can not found user');
  }
};

exports.getProfile = async (req, res) => {
  const findedUser = await UsersModel.findOne({ _id: req.params.id });
  if (!findedUser) {
    res.status(404).send("can not found user");
  } else {
    res.json({
      success: true,
      data: findedUser,
    });
  }
};
