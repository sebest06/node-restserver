const Role = require('../models/role');
const usuario = require('../models/usuario');

const esRoleValido = async (rol = '')  => {
    const existRol = await Role.findOne({rol});
    if( !existRol) {
        throw new Error("el rol no existe");
    }
}

const emailExiste = async (correo = '')  => {
    const existEmail = await usuario.findOne({correo});
    if( existEmail) {
        throw new Error("el email ya existe");
    }
}

const existeIdUsuarios = async (id = '')  => {
    const existId = await usuario.findById(id);
    if( !existId) {
        throw new Error("el id no existe");
    }
}

module.exports= {
    esRoleValido,
    emailExiste,
    existeIdUsuarios
}