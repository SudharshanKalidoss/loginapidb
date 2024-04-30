const express = require('express');
const userRoute = express.Router();
const userController = require('../controllers/user.controllers');

userRoute.post('/register',userController.registerUser);

userRoute.post('/login',userController.loginUser);


module.exports = userRoute;


