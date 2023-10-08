const { response } = require("express");
const { Usuario, Categoria, Producto } = require("../models");
const { ObjectId } = require('mongoose').Types

const coleccionesPermitidas = [
    'usuarios',
    'categorias',
    'productos',
    'roles'
];

const buscarUsuarios = async ( termino = '', res = response) => {

    const esMongoId = ObjectId.isValid(termino);

    if(esMongoId){
        const usuario = await Usuario.findById(termino);
        return res.json({
            results: (usuario) ? [usuario] : []
        });
    }

    const regex = new RegExp( termino, 'i');

    const usuario = await Usuario.find({
        $or: [{nombre: regex},{correo: regex}],
        $and: [{estado: true}]
    });
    return res.json({
        results: (usuario) ? [usuario] : []
    });

    
}

const buscarCategorias = async ( termino = '', res = response) => {

    const esMongoId = ObjectId.isValid(termino);

    if(esMongoId){
        const categoria = await Categoria.findById(termino);
        return res.json({
            results: (categoria) ? [categoria] : []
        });
    }

    const regex = new RegExp( termino, 'i');

    const categoria = await Categoria.find({
        nombre: regex,
        $and: [{estado: true}]
    });
    return res.json({
        results: (categoria) ? [categoria] : []
    });

    
}

const buscarProductos = async ( termino = '', res = response) => {

    const esMongoId = ObjectId.isValid(termino);

    if(esMongoId){
        const productos = await Producto.findById(termino);
        return res.json({
            results: (productos) ? [productos] : []
        });
    }

    const regex = new RegExp( termino, 'i');

    const productos = await Producto.find({
        nombre: regex,
        $and: [{estado: true}]
    });
    return res.json({
        results: (productos) ? [productos] : []
    });

    
}

const buscar = (req, res = response) => {

    const {coleccion, termino} = req.params;

    if( !coleccionesPermitidas.includes( coleccion))
    {
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${coleccionesPermitidas}`
        })
    }

    switch(coleccion){
        case 'usuarios': 
            buscarUsuarios(termino,res);
        break;
        case 'categorias':
            buscarCategorias(termino,res);
        break;
        case 'productos':
            buscarProductos(termino,res);
        break;
        default:
            res.status(500).json({
                msg: 'esta busqueda no fue implentada'
            })

    }

}


module.exports = {
    buscar
}