const { Router } = require('express');
const { check } = require('express-validator');
const {esRoleValido, 
    emailExiste, 
    existeIdUsuarios, 
    existeIdCategoria,
    existeIdProducto } = require('../helpers/db-validators');

const {
    esAdminRole,
    tieneRole,
    validarJWT,
    validarCampos
} = require("../middlewares");


const {crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    borrarProducto} = require('../controllers/productos');

const router = Router();

router.get('/', obtenerProductos);
router.get('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeIdProducto),
    validarCampos
],obtenerProducto);


router.post('/', [ 
    validarJWT,
    check('nombre','El nombre del producto es obligatorio').not().isEmpty(),
    check('categoria','no es un id valido').isMongoId(),
    check('categoria').custom(existeIdCategoria),
    validarCampos
 ],crearProducto);

 router.put('/:id', [
    validarJWT,
    check('id', 'No es un ID valido').isMongoId(),
    //check('id').custom(existeIdProducto),
    //check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
],actualizarProducto);

router.delete('/:id', [
    validarJWT,
    check('id', 'No es un ID valido').isMongoId(),
    tieneRole('ADMIN_ROLE'),
    check('id').custom(existeIdProducto),
    validarCampos
], borrarProducto);

module.exports = router;
