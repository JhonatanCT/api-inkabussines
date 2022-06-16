const express = require("express");
const router = express.Router();
const dorModel = require("../models/dormitorios");

//Crear un documento dormitorio
router.post("/dormitorios", (req, res) => {
    const dor = dorModel(req.body);
    dor.save()
          .then((data) => res.json(data))
          .catch((error) => res.json ({mensaje: error})); 
});

//Leer todos los dormitorio
router.get("/dormitorios", (req, res) => {
    dorModel.find()
        .then((data) => res.json(data))
        .catch((error) => res.json ({mensaje: error}));  
});

//Buscar un dormitorio por id
router.get("/dormitorios/:id", (req, res) => {
    const {id} = req.params;
    dorModel.findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json ({mensaje: error}));  
});

//Actualizar datos de un dormitorio
router.put("/dormitorios/:id", (req, res) => {
    const {id} = req.params;
    const {codigo, nombre, categoria, cantidad, costo} = req.body;
    dorModel
        .updateOne({_id : id}, {$set : {codigo, nombre, categoria, cantidad, costo}})
        .then((data) => res.json(data))
        .catch((error) => res.json ({mensaje: error})); 

});

//Eliminar datos de un dormitorio
router.delete("/dormitorios/:id", (req, res) => {
   const {id} = req.params;
   dorModel.deleteOne({_id : id})
        .then((data) => res.json(data))
        .catch((error) => res.json ({mensaje: error}));   
});

module.exports = router;