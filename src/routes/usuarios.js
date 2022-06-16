const express = require("express");
const router = express.Router();
const usuarioModel = require("../models/usuarios");

//Crear un usuario
router.post("/usuarios", (req, res) => {
    const user = usuarioModel(req.body);
    user.save()
        .then((data) => res.json(data))
        .catch((error) => res.json ({mensaje: error})); 
});

//Leer todos los usuarios
router.get("/usuarios", (req, res) => {
    usuarioModel.find()
        .then((data) => res.json(data))
        .catch((error) => res.json ({mensaje: error}));  
});

//Buscar un usuario por id
router.get("/usuarios/:id", (req, res) => {
    const {id} = req.params;
    usuarioModel.findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json ({mensaje: error}));  
});

//Actualizar datos de un usuario
router.put("/usuarios/:id", (req, res) => {
    const {id} = req.params;
    const {nombre, apellido, nameuser, edad, password, correo} = req.body;
    usuarioModel
        .updateOne({_id : id}, {$set : {nombre, apellido, nameuser, edad, password, correo}})
        .then((data) => res.json(data))
        .catch((error) => res.json ({mensaje: error})); 
});

//Eliminar un usuario
router.delete("/usuarios/:id", (req, res) => {
   const {id} = req.params;
   usuarioModel.deleteOne({_id : id})
        .then((data) => res.json(data))
        .catch((error) => res.json ({mensaje: error}));   
});

module.exports = router;