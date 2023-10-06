const { response } = require("express");


const esAdminRole = (req, res, next) => {

    if( !req.usuario) {
        return res.status(500).json({
            msg: "se quiere verificar el role sin validar el token"
        })
    }

    const { rol, nombre } = req.usuairo;

    if( rol !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: "No es administrador"
        })
    }
    next();

}

const tieneRole = ( ...roles ) => {
    return (req, res = response, next) => {
        console.log(req.usuario);
        if(!req.usuario) {
            return res.status(500).json({
                "msg": 'se quiere verificar el role sin validar el token!'
            })
        }
        if (!roles.includes( req.usuario.rol)){
            return res.status(401).json({
                "msg": 'No tiene el rol necesario'
            })
        }
        next();
    }
}

module.exports = {
    esAdminRole,
    tieneRole
}