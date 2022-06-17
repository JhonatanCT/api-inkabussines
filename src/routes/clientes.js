const express = require("express");
const router = express.Router();
const clientModel = require("../models/clientes");

/**
 * @swagger
 * components:
 *  schemas:
 *    Clientes:
 *      type: object
 *      properties:
 *        codigo:
 *          type: number
 *          description: Codigo del cliente
 *        nombre:
 *          type: string
 *          description: Nombre del cliente
 *        apellido:
 *          type: string
 *          description: Apellido del cliente
 *        telefono:
 *          type: number
 *          description: Telefono del cliente
 *        distrito:
 *          type: string
 *          description: Distrito del cliente
 *        correo:
 *          type: string
 *          description: Correo del cliente
 *      required:
 *        - codigo
 *        - nombre
 *        - apellido
 *        - telefono
 *        - distrito
 *        - correo
 *      example:
 *        codigo: 2
 *        nombre: Victor 
 *        apellido: Gonzales
 *        telefono: 402538479
 *        distrito: Surquillo
 *        correo: victor@gmail.com
 */

/**
 * @swagger
 * /api/clientes:
 *  post:
 *    summary: Crear información de cliente
 *    tags: [Clientes]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#components/schemas/Clientes'
 *    responses:
 *      200:
 *        description: Cliente creado correctamente
 */     
router.post("/clientes", (req, res) => {
    const client = clientModel(req.body);
    client.save()
          .then((data) => res.json(data))
          .catch((error) => res.json ({mensaje: error})); 
});

/**
 * @swagger
 * /api/clientes:
 *  get:
 *    summary: Listar todos los clientes
 *    tags: [Clientes]
 *    responses:
 *      200:
 *        description: Clientes listados correctamente
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *            items:
 *              $ref: '#components/schemas/Clientes'
 *  
 */
router.get("/clientes", (req, res) => {
    clientModel.find()
        .then((data) => res.json(data))
        .catch((error) => res.json ({mensaje: error}));  
});

/**
 * @swagger
 * /api/clientes/{id}:
 *  get:
 *    summary: Buscar un cliente por id
 *    tags: [Clientes]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: id del cliente a buscar
 *    responses:
 *      200:
 *        description: Cliente por id encontrado
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#components/schemas/Cliente'
 *      404:
 *        description: No existe el cliente
 */
router.get("/clientes/:id", (req, res) => {
    const {id} = req.params;
    clientModel.findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json ({mensaje: error}));  
});

/**
 * @swagger
 * /api/clientes/{id}:
 *  put:
 *    summary: Actualizar un cliente por id
 *    tags: [Clientes]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: actualizar cliente por id
 *    responses:
 *      200:
 *        description: Cliente actualizado
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#components/schemas/Clientes'
 *      404:
 *        description: No existe la actualizacion de Clientes
 */
router.put("/clientes/:id", (req, res) => {
    const {id} = req.params;
    const {codigo, nombre, apellido, telefono, distrito, correo} = req.body;
    clientModel
        .updateOne({_id : id}, {$set : {codigo, nombre, apellido, telefono, distrito, correo}})
        .then((data) => res.json(data))
        .catch((error) => res.json ({mensaje: error})); 

});

/**
 * @swagger
 * /api/clientes/{id}:
 *  delete:
 *    summary: Eliminar clientes por id
 *    tags: [Clientes]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: id del cliente a eliminar
 *    responses:
 *      200:
 *        description: Cliente eliminado
 *      404:
 *        description: No existe el Cliente
 */
router.delete("/clientes/:id", (req, res) => {
   const {id} = req.params;
   clientModel.deleteOne({_id : id})
        .then((data) => res.json(data))
        .catch((error) => res.json ({mensaje: error}));   
});

module.exports = router;