const express = require("express");
const router = express.Router();
const reclaModel = require("../models/reclamos");

/**
 * @swagger
 * components:
 *  schemas:
 *    Reclamos:
 *      type: object
 *      properties:
 *        nombre:
 *          type: string
 *          description: Nombre del usuario
 *        apellido:
 *          type: string
 *          description: Apellido del usuario
 *        telefono:
 *          type: number
 *          description: Telefono del usuario
 *        correo:
 *          type: string
 *          description: Correo del usuario
 *        reclamos:
 *          type: string
 *          description: Reclamos de los usuarios  
 *      required:
 *        - nombre
 *        - apellido
 *        - telefono
 *        - correo
 *        - reclamos
 *      example:
 *        nombre: Juan
 *        apellido: Rios
 *        telefono: 123456789
 *        correo: juan@certus.edu.pe
 *        reclamos: No llego el pedido a tiempo
 */

/**
 * @swagger
 * /api/reclamos:
 *  post:
 *    summary: Crear un reclamo
 *    tags: [Reclamos]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#components/schemas/Reclamos'
 *    responses:
 *      200:
 *        description: Reclamo creado correctamente
 */     
router.post("/reclamos", (req, res) => {
    const recla = reclaModel(req.body);
    recla.save()
          .then((data) => res.json(data))
          .catch((error) => res.json ({mensaje: error})); 
});

/**
 * @swagger
 * /api/reclamos:
 *  get:
 *    summary: Listar todos los reclamos
 *    tags: [Reclamos]
 *    responses:
 *      200:
 *        description: Reclamos listados correctamente
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *            items:
 *              $ref: '#components/schemas/Reclamos'
 *  
 */
router.get("/reclamos", (req, res) => {
    reclaModel.find()
        .then((data) => res.json(data))
        .catch((error) => res.json ({mensaje: error}));  
});

/**
 * @swagger
 * /api/reclamos/{id}:
 *  get:
 *    summary: Buscar un reclamo por id
 *    tags: [Reclamos]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: id del reclamo a buscar
 *    responses:
 *      200:
 *        description: Reclamo encontrado
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#components/schemas/Reclamos'
 *      404:
 *        description: No existe el reclamo
 */
router.get("/reclamos/:id", (req, res) => {
    const {id} = req.params;
    reclaModel.findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json ({mensaje: error}));  
});

/**
 * @swagger
 * /api/reclamos/{id}:
 *  put:
 *    summary: Actualizar un reclamo por id
 *    tags: [Reclamos]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: actualizar reclamo por id
 *    responses:
 *      200:
 *        description: Reclamo encontrado
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#components/schemas/Reclamos'
 *      404:
 *        description: No existe la actualizacion de reclamo
 */
router.put("/reclamos/:id", (req, res) => {
    const {id} = req.params;
    const {nombre, apellido, telefono, correo, reclamos} = req.body;
    reclaModel
        .updateOne({_id : id}, {$set : {nombre, apellido, telefono, correo, reclamos}})
        .then((data) => res.json(data))
        .catch((error) => res.json ({mensaje: error})); 
});

/**
 * @swagger
 * /api/reclamos/{id}:
 *  delete:
 *    summary: Eliminar reclamo por id
 *    tags: [Reclamos]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: id del reclamo a eliminar
 *    responses:
 *      200:
 *        description: Reclamo eliminado
 *      404:
 *        description: No existe el reclamo
 */
router.delete("/reclamos/:id", (req, res) => {
   const {id} = req.params;
   reclaModel.deleteOne({_id : id})
        .then((data) => res.json(data))
        .catch((error) => res.json ({mensaje: error}));   
});

module.exports = router;