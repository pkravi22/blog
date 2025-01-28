const joi = require('joi');
console.log("signup started")
const signupValidation = (req, res, next) => {
    const schema = joi.object({
        name: joi.string().min(4).required(),
        email: joi.string().email().required(),
        password: joi.string().required()
    });

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).send({ message: "Bad request", error: error.details[0].message });
    }
    next();
};

const loginValidation = (req, res, next) => {
    const schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().required()
    });

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).send({ message: "Bad request", error: error.details[0].message });
    }
    console.log("login validation success")
    next();
};

module.exports = { signupValidation, loginValidation };