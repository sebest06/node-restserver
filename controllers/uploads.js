const { response } = require("express");
const { subirArchivo } = require("../helpers");
const { Usuario, Producto } = require("../models");
const { model } = require("mongoose");
const fs = require('fs');
const path = require("path");

const cargarArchivo = async (req, res = response) => {
  
  /*if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400).json({ msg: "No files were uploaded." });
    return;
  }

  if (!req.files.archivo) {
    res.status(400).json({ msg: "No files were uploaded." });
    return;
  }*/

  try {
    //const nombre = await subirArchivo(req.files, ['txt','md'],'textos');
    const nombre = await subirArchivo(req.files, undefined, "imgs");
    res.json({
      nombre,
    });
  } catch (msg) {
    res.status(400).json({
      msg,
    });
  }
};

const actualizarImagen = async (req, res = response) => {
  const { coleccion, id } = req.params;

  let modelo;

  switch (coleccion) {
    case "usuarios":
        modelo = await Usuario.findById(id);
        if(!modelo) {
            return res.status(400).json({msg: "usuario no exite"});
        }
      break;
    case "productos":
        modelo = await Producto.findById(id);
        if(!modelo) {
            return res.status(400).json({msg: "producto no exite"});
        }
      break;
    default:
      return res.status(500).json("error no implementado");
  }

/*  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400).json({ msg: "No files were uploaded." });
    return;
  }

  if (!req.files.archivo) {
    res.status(400).json({ msg: "No files were uploaded." });
    return;
  }*/
  try {
    //const nombre = await subirArchivo(req.files, ['txt','md'],'textos');

    //Limpiar imagen anterior

    
    if ( modelo.img) {
      const pathImagen = path.join(__dirname, '../uploads',  coleccion, modelo.img );
      if( fs.existsSync(pathImagen))
      {
        fs.unlinkSync(pathImagen);
      }
    }

    const nombre = await subirArchivo(req.files, undefined, coleccion);
    modelo.img = nombre;

    await modelo.save();
    
    res.json({
        modelo,
    });
  } catch (msg) {
    res.status(400).json({
      msg,
    });
  }
};

const mostrarImagen = async (req, res = response) => {
  const {id, coleccion} = req.params;
  let modelo;

  switch (coleccion) {
    case "usuarios":
        modelo = await Usuario.findById(id);
        if(!modelo) {
            return res.status(400).json({msg: "usuario no exite"});
        }
      break;
    case "productos":
        modelo = await Producto.findById(id);
        if(!modelo) {
            return res.status(400).json({msg: "producto no exite"});
        }
      break;
    default:
      return res.status(500).json("error no implementado");
  }

  try {
    
    if ( modelo.img) {
      const pathImagen = path.join(__dirname, '../uploads',  coleccion, modelo.img );
      if( fs.existsSync(pathImagen))
      {
        return res.sendFile( pathImagen);
      }
    }

    const pathImagen = path.join(__dirname, '../assets',  'no-image.jpg' );
    return res.sendFile( pathImagen);

  } catch (msg) {
    res.status(400).json({
      msg,
    });
  }
}

module.exports = {
  cargarArchivo,
  actualizarImagen,
  mostrarImagen
};
