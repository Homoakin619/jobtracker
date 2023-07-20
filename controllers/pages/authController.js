
const asyncHandler = require('express-async-handler')
const User = require('../../models/User');
const {BadRequestError,NotFoundError, CustomAPIError, UnauthorizedError} = require('../../errors/errors')
const jwt = require('jsonwebtoken');


const loginPageController = asyncHandler(async(req,res) => {

    res.render("login",{title: 'Login Page'});
})


const registerPageController = asyncHandler( async (req,res) => {
    const user = await User.create({...req.body});
    res.status(200).json({msg: "Register Route",user})
})

module.exports = {loginPageController,registerPageController}