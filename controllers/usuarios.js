const {response} = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');


const usuariosGet = async(req, res = response) => {

    const {limite = 5, desde = 0 } = req.query;
    const query = {estado: true};
    
    const [ total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query).limit(Number(limite)).skip(Number(desde))
    ]);

    res.json({
        total,
        usuarios
    });

}

const usuariosPost = async(req, res = response) => {



    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario( {nombre, correo, password, rol} );

    // Verificar si correo existe
    /*const existeEmail = await Usuario.findOne({correo});
    if( existeEmail )
    {
        return res.status(400).json({
            msg: 'Ese correo ya existe en la base de datos'
        })
    }*/



    //encriptar
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt);

    //guardar
    await usuario.save();

    res.json({
        usuario
    });

}

const usuariosPut = async (req, res = response) => {

    const id = req.params.id;
    const { _id, password, google, correo, ...resto } = req.body;

    // Todo validar id valido

    if( password ){
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);


    res.json({
        usuario
    });

}

const usuariosDelete = async (req, res = response) => {

    const id = req.params.id;

    //fisicamente borrado

    //const usuario = await Usuario.findByIdAndDelete( id );
    const usuario = await Usuario.findByIdAndUpdate( id , {estado: false});
    

    res.json({
        usuario
    });

}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}