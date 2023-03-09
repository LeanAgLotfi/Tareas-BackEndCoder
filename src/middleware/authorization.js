//MANEJO DE ERRORES DE AUTHENTICADED
const authorization = (role) =>{
    return async (req, res, next)=>{
        if(!req.user){
            return res.status(401).json({error: 'Not Authenticaded'});
        }
        if(req.user.role !== role){
            return res.status(403).json({ error: 'Access Denied' })
        }
        next();
    };
}

module.exports = {
    authorization
};