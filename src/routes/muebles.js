const express = require("express");
const router = express.Router();
const muebleModel = require("../models/muebles");

//Crear un client
router.post("/muebles", (req, res) => {
    const mueble = muebleModel(req.body);
    mueble.save()
          .then((data) => res.json(data))
          .catch((error) => res.json ({mensaje: error})); 
});

//Leer todos los client
router.get("/muebles", (req, res) => {
    muebleModel.find()
        .then((data) => res.json(data))
        .catch((error) => res.json ({mensaje: error}));  
});

//Buscar un client por id
router.get("/muebles/:id", (req, res) => {
    const {id} = req.params;
    muebleModel.findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json ({mensaje: error}));  
});

//Actualizar datos de un client
router.put("/muebles/:id", (req, res) => {
    const {id} = req.params;
    const {codigo, nombre, categoria, cantidad, costo} = req.body;
    muebleModel
        .updateOne({_id : id}, {$set : {codigo, nombre, categoria, cantidad, costo}})
        .then((data) => res.json(data))
        .catch((error) => res.json ({mensaje: error})); 

});

//Eliminar un client
router.delete("/muebles/:id", (req, res) => {
   const {id} = req.params;
   muebleModel.deleteOne({_id : id})
        .then((data) => res.json(data))
        .catch((error) => res.json ({mensaje: error}));   
});

module.exports = router;