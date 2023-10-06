
const { Router } = require('express');
const { check } = require('express-validator');
const {esRoleValido, 
    emailExiste, 
    existeIdUsuarios, 
    existeIdCategoria } = require('../helpers/db-validators');

const {
    esAdminRole,
    tieneRole,
    validarJWT,
    validarCampos
} = require("../middlewares");

const {crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria} = require('../controllers/categorias');

const router = Router();

router.get('/', obtenerCategorias);
router.get('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeIdCategoria),
    validarCampos
],obtenerCategoria);


router.post('/', [ 
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
 ],crearCategoria);

 router.put('/:id', [
    validarJWT,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeIdCategoria),
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
],actualizarCategoria);

router.delete('/:id', [
    validarJWT,
    check('id', 'No es un ID valido').isMongoId(),
    tieneRole('ADMIN_ROLE'),
    check('id').custom(existeIdCategoria),
    validarCampos
], borrarCategoria);

module.exports = router;
