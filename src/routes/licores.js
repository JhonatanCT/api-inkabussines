const express = require("express");
const router = express.Router();
const licorModel = require("../models/licores");

//Crear un documento licor
router.post("/licores", (req, res) => {
    const licor = licorModel(req.body);
    licor.save()
          .then((data) => res.json(data))
          .catch((error) => res.json ({mensaje: error})); 
});

//Leer todos los licores
router.get("/licores", (req, res) => {
    licorModel.find()
        .then((data) => res.json(data))
        .catch((error) => res.json ({mensaje: error}));  
});

//Buscar un licor por id
router.get("/licores/:id", (req, res) => {
    const {id} = req.params;
    licorModel.findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json ({mensaje: error}));  
});

//Actualizar datos de un licor
router.put("/licores/:id", (req, res) => {
    const {id} = req.params;
    const {codigo, nombre, categoria, cantidad, costo} = req.body;
    licorModel
        .updateOne({_id : id}, {$set : {codigo, nombre, categoria, cantidad, costo}})
        .then((data) => res.json(data))
        .catch((error) => res.json ({mensaje: error})); 

});

//Eliminar datos de un licor
router.delete("/licores/:id", (req, res) => {
   const {id} = req.params;
   licorModel.deleteOne({_id : id})
        .then((data) => res.json(data))
        .catch((error) => res.json ({mensaje: error}));   
});

module.exports = router;