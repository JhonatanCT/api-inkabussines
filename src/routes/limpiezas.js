const express = require("express");
const router = express.Router();
const limpModel = require("../models/limpiezas");

//Crear un documento limpieza
router.post("/limpiezas", (req, res) => {
    const limp = limpModel(req.body);
    limp.save()
          .then((data) => res.json(data))
          .catch((error) => res.json ({mensaje: error})); 
});

//Leer todos los limpieza
router.get("/limpiezas", (req, res) => {
    limpModel.find()
        .then((data) => res.json(data))
        .catch((error) => res.json ({mensaje: error}));  
});

//Buscar un limpieza por id
router.get("/limpiezas/:id", (req, res) => {
    const {id} = req.params;
    limpModel.findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json ({mensaje: error}));  
});

//Actualizar datos de un limpieza
router.put("/limpiezas/:id", (req, res) => {
    const {id} = req.params;
    const {codigo, nombre, categoria, cantidad, costo} = req.body;
    limpModel
        .updateOne({_id : id}, {$set : {codigo, nombre, categoria, cantidad, costo}})
        .then((data) => res.json(data))
        .catch((error) => res.json ({mensaje: error})); 

});

//Eliminar datos de un limpieza
router.delete("/limpiezas/:id", (req, res) => {
   const {id} = req.params;
   limpModel.deleteOne({_id : id})
        .then((data) => res.json(data))
        .catch((error) => res.json ({mensaje: error}));   
});

module.exports = router;