require('dotenv').config()

const JWTService = require('../utils/jwtService')

const sessionMiddleware = (req,res,next) => {
    const session = req.session;

    if (!session.user) {
        // redirect to login page not authenticated user
        return res.redirect('/login')
    }
    
    const token = session.user.token;
    const jwtService = new JWTService(token,process.env.JWT_SECRET)
    if(!jwtService.isValidToken || !jwtService.isActiveToken) {
        
      return  res.redirect("/login")
    }
    next()

}

module.exports = sessionMiddleware