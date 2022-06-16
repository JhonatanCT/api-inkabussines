const mongoose = require("mongoose");

const muebleModel = mongoose.Schema({

    codigo: {
        type: Number,
        required: true,
        min: 1,
        max: 1000,
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

module.exports = mongoose.model("Muebles", muebleModel);