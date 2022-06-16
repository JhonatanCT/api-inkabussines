const express = require("express");
const router = express.Router();
const reclaModel = require("../models/reclamos");

//Crear un reclamo
router.post("/reclamos", (req, res) => {
    const recla = reclaModel(req.body);
    recla.save()
          .then((data) => res.json(data))
          .catch((error) => res.json ({mensaje: error})); 
});

//Leer todos los reclamos
router.get("/reclamos", (req, res) => {
    reclaModel.find()
        .then((data) => res.json(data))
        .catch((error) => res.json ({mensaje: error}));  
});

//Buscar un reclamo por id
router.get("/reclamos/:id", (req, res) => {
    const {id} = req.params;
    reclaModel.findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json ({mensaje: error}));  
});

//Actualizar datos de un reclamo
router.put("/reclamos/:id", (req, res) => {
    const {id} = req.params;
    const {nombre, apellido, telefono, correo, reclamos} = req.body;
    reclaModel
        .updateOne({_id : id}, {$set : {nombre, apellido, telefono, correo, reclamos}})
        .then((data) => res.json(data))
        .catch((error) => res.json ({mensaje: error})); 

});

//Eliminar un reclamo
router.delete("/reclamos/:id", (req, res) => {
   const {id} = req.params;
   reclaModel.deleteOne({_id : id})
        .then((data) => res.json(data))
        .catch((error) => res.json ({mensaje: error}));   
});

module.exports = router;