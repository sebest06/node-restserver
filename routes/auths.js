
const { Router } = require('express');
const { check } = require('express-validator');
const {esRoleValido, emailExiste, existeIdUsuarios} = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { login } = require('../controllers/auths');

const router = Router();

router.post('/login', [
    check('correo','El correo es obligatorio').isEmail(),
    check('password','El correo es obligatorio').not().isEmpty(),
    validarCampos
],login);

module.exports = router;
