const express = require("express");
const router = express.Router();
const mascotModel = require("../models/mascotas");

//Crear un documento mascotas
router.post("/mascotas", (req, res) => {
    const mascot = mascotModel(req.body);
    mascot.save()
          .then((data) => res.json(data))
          .catch((error) => res.json ({mensaje: error})); 
});

//Leer todos los mascotas
router.get("/mascotas", (req, res) => {
    mascotModel.find()
        .then((data) => res.json(data))
        .catch((error) => res.json ({mensaje: error}));  
});

//Buscar un mascotas por id
router.get("/mascotas/:id", (req, res) => {
    const {id} = req.params;
    mascotModel.findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json ({mensaje: error}));  
});

//Actualizar datos de un mascotas
router.put("/mascotas/:id", (req, res) => {
    const {id} = req.params;
    const {codigo, nombre, categoria, cantidad, costo} = req.body;
    mascotModel
        .updateOne({_id : id}, {$set : {codigo, nombre, categoria, cantidad, costo}})
        .then((data) => res.json(data))
        .catch((error) => res.json ({mensaje: error})); 
});

//Eliminar datos de un mascotas
router.delete("/mascotas/:id", (req, res) => {
   const {id} = req.params;
   mascotModel.deleteOne({_id : id})
        .then((data) => res.json(data))
        .catch((error) => res.json ({mensaje: error}));   
});

module.exports = router;