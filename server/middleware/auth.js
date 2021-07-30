const jwt = require('jsonwebtoken')
const {decode} = require('jsonwebtoken')
 
const auth = async (req,res,next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500;

        let decodeData;

        if(token && isCustomAuth) { //Regular login
            decodeData = jwt.verify(token, 'test');
            req.userId = decodeData.id;

        } else { //for Google's OAuth token
            decodeData = jwt.decode(token);
            req.userId = decodeData.sub
        }

        next();

    } catch (error) {
        console.log(error)
    }
}

module.exports = {auth};
