const signup = require('../Controllers/AuthControllers');
const { signupValidation, loginValidation } = require('../Middlewares/AuthValidation');

const router= require('express').Router();

router.post('/login', loginValidation,signup.login);

router.post('/signup',signupValidation,signup.signup);

module.exports=router;
