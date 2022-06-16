const mongoose = require("mongoose");

const mascotModel = mongoose.Schema({

    codigo: {
        type: Number,
        min: 1,
        max: 1000,
        required: true,
    },
    nombre: {
        type: String,
        required: true
    },
    categoria: {
        type: String,
        required: true
    },
    cantidad: {
        type: Number,
        min: 0,
        max: 500,
        required: true,   
    },
    costo: {
        type: Number,
        required: true
    }
  
});

module.exports = mongoose.model("Mascotas", mascotModel);