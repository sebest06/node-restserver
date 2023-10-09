const validaRoles = require('../middlewares/validar-roles');
const validaJWT = require('../middlewares/validar-jwt');
const validaCampos = require('../middlewares/validar-campos');
const validarArchivoSubir = require('../middlewares/validar-archivo');

module.exports = {
    ...validaCampos,
    ...validaRoles,
    ...validaJWT,
    ...validarArchivoSubir
}