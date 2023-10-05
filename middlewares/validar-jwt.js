const jwt = require('jsonwebtoken');
const usuario = require('../models/usuario');

const validarJWT= async(req = request, res = response, next) => {
    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({msg: 'no hay token'});
    }

    try{
        const { uid } = jwt.verify(token, process.env.SECRETORPUBLICKEY);
        
        usuario = await usuario.findById(uid);

        if(!usuario) {
            return res.status(401).json({msg: 'usuario no existe'});
        }
        if(!usuario.estado){
            return res.status(401).json({msg: 'no hay token'});
        }
        

        req.uid = uid;
        req.usuario = usuario;
        
        
        next();
    } catch (err) {
        console.log(error);
        return res.status(401).json({msg: 'error token'});
    }
    
}

module.exports = {
    validarJWT
}
