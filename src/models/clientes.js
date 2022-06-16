const mongoose = require("mongoose");

const clientModel = mongoose.Schema({

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
    apellido: {
        type: String,
        required: true
    },
    telefono: {
        type: Number,
        required: true,  
    },
    distrito: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true
    }
  
});

module.exports = mongoose.model("Clientes", clientModel);