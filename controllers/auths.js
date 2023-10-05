const {response} = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');


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


module.exports = {
    login
}