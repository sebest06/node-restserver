

const {Schema, model} = require('mongoose');

const ProductoSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        require: true
    },
    precio: {
        type: Number,
        default: 0
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        require: true
    },
    descripcion: {
        type: String
    },
    disponible: { type: Boolean, default: true}
});

ProductoSchema.methods.toJSON = function() {
    const { __v, _id, ...data } = this.toObject();
    data.uid = _id;
    return data;
}


module.exports = model( 'Producto', ProductoSchema );