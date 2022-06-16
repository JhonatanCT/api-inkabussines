const express = require("express");
const router = express.Router();
const clientModel = require("../models/clientes");

//Crear un client
router.post("/clientes", (req, res) => {
    const client = clientModel(req.body);
    client.save()
          .then((data) => res.json(data))
          .catch((error) => res.json ({mensaje: error})); 
});

//Leer todos los client
router.get("/clientes", (req, res) => {
    clientModel.find()
        .then((data) => res.json(data))
        .catch((error) => res.json ({mensaje: error}));  
});

//Buscar un client por id
router.get("/clientes/:id", (req, res) => {
    const {id} = req.params;
    clientModel.findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json ({mensaje: error}));  
});

//Actualizar datos de un client
router.put("/clientes/:id", (req, res) => {
    const {id} = req.params;
    const {codigo, nombre, apellido, telefono, distrito, correo} = req.body;
    clientModel
        .updateOne({_id : id}, {$set : {codigo, nombre, apellido, telefono, distrito, correo}})
        .then((data) => res.json(data))
        .catch((error) => res.json ({mensaje: error})); 

});

//Eliminar un client
router.delete("/clientes/:id", (req, res) => {
   const {id} = req.params;
   clientModel.deleteOne({_id : id})
        .then((data) => res.json(data))
        .catch((error) => res.json ({mensaje: error}));   
});

module.exports = router;