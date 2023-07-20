
const {CustomAPIError} = require('../errors/errors')

const errorHandler = (err,req,res,next) => {
    console.log(err);
    // console.log("Errror logged");
    // const customError = {
    //     statusCode: err.statusCode || 500,
    //     msg: err.message || "Something went wrong"
    // };
    if (err instanceof CustomAPIError) {
        return res.status(err.statusCode).json({message:err.message})
    }
    return res.status(400).json({err});
    
}

module.exports = errorHandler