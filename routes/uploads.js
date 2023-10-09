
const { Router } = require('express');
const { check } = require('express-validator');
const {esRoleValido, emailExiste, existeIdUsuarios, } = require('../helpers/db-validators');

const {
    esAdminRole,
    tieneRole,
    validarJWT,
    validarCampos
} = require("../middlewares");

const { cargarArchivo } = require('../controllers/uploads');


const router = Router();

router.post('/', cargarArchivo);

module.exports = router;
