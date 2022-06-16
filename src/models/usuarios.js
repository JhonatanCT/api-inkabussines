const mongoose = require("mongoose");

const usuarioModel = mongoose.Schema({

    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    nameuser: {
        type: String,
        required: true,
    },
    edad: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,   
    },
    correo: {
        type: String,
        required: true
    }
  
});

module.exports = mongoose.model("Usuarios", usuarioModel);