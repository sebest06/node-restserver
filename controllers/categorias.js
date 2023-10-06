const {response} = require('express');
const {Categoria} = require('../models');
const bcryptjs = require('bcryptjs');

const obtenerCategorias = async(req, res = response) => {
    const {limite = 5, desde = 0 } = req.query;
    const query = {estado: true};
    
    const [ total, categorias] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query).populate("usuario",'nombre').limit(Number(limite)).skip(Number(desde))
    ]);

    res.json({
        total,
        categorias
    });

}

const obtenerCategoria = async(req, res = response) => {
    const categoria = await Categoria.findById(req.params.id).populate("usuario", 'nombre');

    res.json({
        categoria
    });

}

const actualizarCategoria = async(req, res = response) => {
    const id = req.params.id;
    const { _id, usuario, ...resto } = req.body;

    resto.nombre = resto.nombre.toUpperCase();
    resto.usuario = req.usuario._id;

    // Todo validar id valido

    const categoria = await Categoria.findByIdAndUpdate(id, resto, {new: true});

    res.json({
        categoria
    });
}

const crearCategoria = async(req, res = response) => {

    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({nombre});

    if(categoriaDB){
        return res.status(400).json({
            msg: "La categoria ya existe"
        })
    }

    const data = {
        nombre, 
        usuario: req.usuario._id
    }

    const categoria = new Categoria(data);
    await categoria.save();

    res.status(201).json(categoria);

}

const borrarCategoria = async(req, res = response) => {
    const { id } = req.params;

    const categoria = await Categoria.findByIdAndUpdate( id , {estado: false, usuario: req.usuario})

    res.json({
        categoria
    });

}

module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria
}

