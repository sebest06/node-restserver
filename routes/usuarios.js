
const { Router } = require('express');
const { check } = require('express-validator');
const {esRoleValido, emailExiste, existeIdUsuarios} = require('../helpers/db-validators');
const {esAdminRole} = require('../middlewares/validar-roles');


const { validarCampos } = require('../middlewares/validar-campos');
const { usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete } = require('../controllers/usuarios');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', usuariosGet);
router.post('/', [
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','El password es obligatorio de mas de 6 letras').isLength({ min: 6}),
    check('correo','El correo no es valido').isEmail(),
    //check('rol','No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),
    //check('rol').custom( (rol) => esRoleValido(rol) ), // ES LO MISMO QUE ABAJO
    check('rol').custom( esRoleValido ),
    check('correo').custom( emailExiste ),
    validarCampos
],usuariosPost);

router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeIdUsuarios),
    check('rol').custom( esRoleValido ),
    validarCampos
],usuariosPut);

router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeIdUsuarios),
    validarCampos
], usuariosDelete);

module.exports = router;
