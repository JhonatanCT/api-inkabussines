const mongoose = require("mongoose");

const reclaModel = mongoose.Schema({

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
    correo: {
        type: String,
        required: true
    },
    reclamos: {
        type: String,
        description: "Los reclamos de los usuarios",
        required: true
    },
  
});

module.exports = mongoose.model("Reclamos", reclaModel);