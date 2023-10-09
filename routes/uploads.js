
const { Router } = require('express');
const { check } = require('express-validator');
const {esRoleValido, emailExiste, existeIdUsuarios, coleccionesPermitidas } = require('../helpers/db-validators');

const {
    esAdminRole,
    tieneRole,
    validarJWT,
    validarCampos,
    validarArchivoSubir
} = require("../middlewares");

const { cargarArchivo } = require('../controllers/uploads');


const router = Router();

router.post('/', validarArchivoSubir, cargarArchivo);
router.put('/:coleccion/:id', [
    validarArchivoSubir,
    check('id','mongo id').isMongoId(),
    check('coleccion').custom(c=> coleccionesPermitidas (c, ['usuario','productos'])),
    validarCampos
], cargarArchivo);

module.exports = router;
