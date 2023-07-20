
const asyncHandler = require('express-async-handler')
const User = require('../../models/User');
const {BadRequestError,NotFoundError, CustomAPIError, UnauthorizedError} = require('../../errors/errors')

const loginController = asyncHandler(async(req,res) => {
    const {email,password} = req.body;
    
    if(!email || !password) {
        throw new BadRequestError("Email and Password are required")
    }
    const accountExists = await User.findOne({email:email});
    
    if(!accountExists) {
        throw new UnauthorizedError("Invalid Credentials");
    }
    if(!accountExists.matchPassword(password)) {
        throw new UnauthorizedError("Invalid Auth Credentials");
    }
    req.session.user = {userId: accountExists._id.toString(), username: accountExists.email,token: accountExists.generateToken()}
 
    res.status(200).json({msg: "Successfully logged in",token: accountExists.generateToken()});
})

const registerController = asyncHandler( async (req,res) => {
    
    const user = await User.create({...req.body});

    res.status(200).json({msg: "Register Route",user})
})


module.exports = {loginController,registerController}