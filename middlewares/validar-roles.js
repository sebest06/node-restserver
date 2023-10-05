

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

module.exports = {
    esAdminRole
}