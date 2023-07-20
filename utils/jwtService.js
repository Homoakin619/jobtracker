require('dotenv').config()

const jwt = require('jsonwebtoken');

const isValidToken = (token) => {
    const validToken = jwt.verify(token,process.env.JWT_SECRET);
    
    if(!validToken) {
        return false;
    }
    
}

class JWTService {
    constructor(token,secret) {
        this.token = token;
        this.secret = secret;
    }

    isValidToken () {
        const validToken = jwt.verify(this.token,this.secret);
        if (!validToken) {
            return false
        }
        return true;
    }

    isActiveToken() {
        const {exp} = jwt.decode(this.token);
        if(Date.now() >= exp * 1000) {
            return false
        }
        return true
    }

    refreshToken () {
        // get token and create a new token
    }

}

module.exports = JWTService;