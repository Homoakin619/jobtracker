const notFound = (req,res,next) => {
    return res.status(404).json({msg:"Route does not exist"})
}

module.exports = notFound