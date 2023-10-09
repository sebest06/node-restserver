const { response } = require("express");
const { subirArchivo } = require("../helpers");
const { Usuario, Producto } = require("../models");

const cargarArchivo = async (req, res = response) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400).json({ msg: "No files were uploaded." });
    return;
  }

  if (!req.files.archivo) {
    res.status(400).json({ msg: "No files were uploaded." });
    return;
  }

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
  const { coleccion, id } = req.param;

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



  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400).json({ msg: "No files were uploaded." });
    return;
  }

  if (!req.files.archivo) {
    res.status(400).json({ msg: "No files were uploaded." });
    return;
  }

  try {
    //const nombre = await subirArchivo(req.files, ['txt','md'],'textos');
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

module.exports = {
  cargarArchivo,
  actualizarImagen,
};
