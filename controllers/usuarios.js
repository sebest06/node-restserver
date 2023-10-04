const {response} = require('express');

const usuariosGet = (req, res = response) => {

    const params = req.query;
    res.json({
        msg: 'get API - Controlador',
        params
    });

}

const usuariosPost = (req, res = response) => {

    const body = req.body;

    res.json({
        msg: 'post API - Controlador',
        body
    });

}

const usuariosPut = (req, res = response) => {

    const id = req.params.id;

    res.json({
        msg: 'put API - Controlador',
        id
    });

}

const usuariosDelete = (req, res = response) => {

    res.json({
        msg: 'delete API - Controlador'
    });

}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}