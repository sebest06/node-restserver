const {response} = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');


const login = async(req, res = response) => {


    const {correo, password} = req.body;
    
    try{

        const usuario = await Usuario.findOne({correo});
        if( !usuario ) {
            return res.status(400).json({
                msg: 'correo no existe'
            })
        }

        if( !usuario.estado ) {
            return res.status(400).json({
                msg: 'usuario borrado'
            })
        }

        const validPassword = bcryptjs.compareSync( password, usuario.password);

        if( !validPassword )
        {
            return res.status(400).json({
                msg: 'password equivocada'
            })
        }

        const token = await (generarJWT( usuario.id ));


        res.json({
            msg: 'login',
            usuario,
            token
        })

    } catch(error) {
        return res.status(500).json({
            msg: "algo salio mal"
        })
    }

}

const googleSignIn = async( req, res = response ) => {
    const { id_token } = req.body;

    try {

        const {nombre, img, correo } = await googleVerify( id_token );

        let usuario = await Usuario.findOne({correo});

        if(!usuario) {
            const data = {
                nombre,
                correo,
                password: ':P',
                img,
                google: true,
                rol: 'USER_ROLE'
            };

            usuario = new Usuario(data);
            await usuario.save();
        }

        // Si el usuario DB
        if(!usuario.estado) {
            return res.status(401).json({
                msg: 'Usuario borrado'
            })
        }

        const token = await generarJWT(usuario.id);

        res.json({
            msg: 'Toto bien',
            token,
            usuario
        })

    } catch (err) {
        console.log(err);
        res.status(400).json({
            msg: 'token mal'
        })
    }

}


module.exports = {
    login,
    googleSignIn
}