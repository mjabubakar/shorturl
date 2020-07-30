const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { validationResult } = require("express-validator");

exports.login = async (req, res, next) => {

    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
        const error = new Error("Invalid email or password.");
        error.code = 422;
        return next(error);
    }

    const isEqual = await bcrypt.compare(password, user.password);

    if (!isEqual) {
        const error = new Error("Invalid email or password.");
        error.code = 422;
        return next(error);
    }

    const token = jwt.sign({
        email: user.email,
    },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "24hr" },
    );

    res.status(200).json(token);
}

exports.register = async (req, res, next) => {
    const { email, password } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const error = new Error("Invalid input.");
        error.code = 422;
        return next(error);
    }

    const emailExist = await User.findOne({ where: { email } });

    if (emailExist) {
        const error = new Error("User exist already!");
        error.code = 409;
        return next(error);
    }

    const hashedPassword = await bcrypt.hash(password, 15);

    await User.create({
        email,
        password: hashedPassword
    }).catch(() => {
        const error = new Error("Validation error occured.");
        error.code = 422;
        return next(error);
    });

    res.status(201).json("Created account successfully");
}