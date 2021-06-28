const UsersModel = require('../models/users');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const key = require('../utils/key');
const config = require('config');



exports.signIn = async (req, res) => {

    const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required()
    });

    const validateResult = schema.validate(req.body);

    const { error } = validateResult;

    if (!error) {
        const { email, password } = req.body;
        const findedUser = await UsersModel.find({ email: email, password: password });
        if (!findedUser || findedUser.length == 0) {
            res.send({
                success: false,
                message: 'Email or password is wrong'
            });
        } else {
            // console.log(findedUser[0]);
            const token = jwt.sign({_id: findedUser[0]._id}, key);
            // res.header('x-auth-token', token).send({
            //     token,
            //     success: true,
            //     data: findedUser
            // });
            res.send({
                token,
                success: true,
                data: findedUser
            });
        }
    } else {
        res.status(400).send({
            success: false,
            message: error.details[0].message
        });
    }

};
exports.renderSignInEjs = (req, res) => {
    res.render('auth/sign-in', { isMustSignUp: false });
};


exports.signUp = async (req, res) => {

    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required()
    });


    const validateResult = schema.validate(req.body);

    const { error } = validateResult;

    if (!error) {
        const inspection = await UsersModel.find({ email: req.body.email, password: req.body.password });
        // console.log(inspection);
        if (!inspection || inspection.length == 0) {
            const user = new UsersModel(req.body);
            const savedUser = await user.save();
            const token = jwt.sign({_id: savedUser._id}, key);
            // res.header('x-auth-token',token).send({
            //     token,
            //     success: true,
            //     data: savedUser
            // });
            res.send({
                token,
                success: true,
                data: savedUser
            });

        } else {
            res.send({
                success: false,
                message: 'Email and Password already taken'
            });
        }
    } else {
        res.status(400).send({
            success: false,
            message: error.details[0].message
        });
    }

};
exports.renderSigupnEjs = (req, res) => {
    res.render('auth/sign-up');
};


exports.updateProfile = async (req, res) => {
    const result = await UsersModel.updateOne({ _id: req.params.id }, req.body);
    res.send({
        success: true,
        data: result
    });
};

exports.renderProfileEjs = (req,res) => {
    res.render('profile');
};
exports.getProfile = async (req,res) => {
    const findedUser = await UsersModel.find({_id: req.user._id});
    if(!findedUser || findedUser.length == 0) {
        res.send({
            success: false
        });
    } else {
        res.send({
            success: true
        });
    }
}

