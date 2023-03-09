const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../constants/constants');
//TOKEN AUTHENTICADOR
const authToken = (req, res, next)=>{
    const authHeader = req.headers.authorization;
    if(!authHeader){
         return res.status(401).json({ error: 'Not authenticaded' });
    }
    const token = authHeader.split(" ")[1];
    jwt.verify(token, SECRET_KEY, (error, credential)=>{
        if(error){
            return res.status(403).json({error: 'Not authorized'})
        }
        req.user = credential.user;
        next();
    })
};
//EXTRACTOR DE COOKIES 
const cookieExtractor = req =>{
    let token = null;
    if(req && req.cookies){
        token = req.cookies['cookieToken']
    }
    return token
}

module.exports={
    authToken,
    cookieExtractor
};