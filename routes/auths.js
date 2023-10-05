
const { Router } = require('express');
const { check } = require('express-validator');
const {esRoleValido, emailExiste, existeIdUsuarios} = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { login,googleSignIn } = require('../controllers/auths');

const router = Router();

router.post('/login', [
    check('correo','El correo es obligatorio').isEmail(),
    check('password','El correo es obligatorio').not().isEmpty(),
    validarCampos
],login);


router.post('/google', [
    check('id_token','El ide token  es obligatorio').not().isEmpty(),
    validarCampos
],googleSignIn);

module.exports = router;
