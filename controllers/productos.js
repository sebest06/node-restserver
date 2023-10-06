const {response} = require('express');
const {Producto} = require('../models');
const bcryptjs = require('bcryptjs');

const obtenerProductos = async(req, res = response) => {
    const {limite = 5, desde = 0 } = req.query;
    const query = {estado: true};
    
    const [ total, productos] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
        .populate("usuario",'nombre')
        .populate("categoria",'nombre')
        .limit(Number(limite))
        .skip(Number(desde))
    ]);

    res.json({
        total,
        productos
    });

}

const obtenerProducto = async(req, res = response) => {
    const producto = await Producto.findById(req.params.id)
    .populate("usuario", 'nombre')
    .populate("categoria",'nombre');

    res.json({
        producto
    });

}

const actualizarProducto = async(req, res = response) => {
    const id = req.params.id;
    const { _id, usuario, ...resto } = req.body;

    if(data.nombre) {
        resto.nombre = resto.nombre.toUpperCase();
    }

    resto.usuario = req.usuario._id;

    // Todo validar id valido

    const producto = await Producto.findByIdAndUpdate(id, resto, {new: true});

    res.json({
        producto
    });
}

const crearProducto = async(req, res = response) => {

    const {estado, usuario, nombre, ...body} = req.body;
    //const nombre = req.body.nombre.toUpperCase();
    //const buscar = nombre.toUpperCase();

    const ProductoDB = await Producto.findOne({'nombre': nombre.toUpperCase()});

    if(ProductoDB){
        return res.status(400).json({
            msg: "El producto ya existe"
        })
    }


    const data = {
        nombre: nombre.toUpperCase(),
        body, 
        usuario: req.usuario._id,
        categoria: req.body.categoria
    }

    const producto = new Producto(data);
    await producto.save();

    res.status(201).json(producto);

}

const borrarProducto = async(req, res = response) => {
    const { id } = req.params;

    const producto = await Producto.findByIdAndUpdate( id , {estado: false, usuario: req.usuario})

    res.json({
        producto
    });

}

module.exports = {
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    borrarProducto
}

