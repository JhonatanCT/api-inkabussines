const express = require("express");
const router = express.Router();
const dorModel = require("../models/dormitorios");

/**
 * @swagger
 * components:
 *  schemas:
 *    Categoria:Dormitorios:
 *      type: object
 *      properties:
 *        codigo:
 *          type: number
 *          description: Codigo del producto  
 *        nombre:
 *          type: string
 *          description: Nombre del producto
 *        categoria:
 *          type: string
 *          description: Categoria del producto
 *        cantidad:
 *          type: number
 *          description: Productos en stock
 *        costo:
 *          type: number
 *          description: Precio del producto
 *      required:
 *        - codigo
 *        - nombre
 *        - categoria
 *        - cantidad
 *        - costo
 *      example:
 *        codigo: 99
 *        nombre: Escritorio gamer
 *        categoria: Dormitorio
 *        cantidad: 55
 *        costo: 499.90
 */

/**
 * @swagger
 * /api/dormitorios:
 *  post:
 *    summary: Crear un producto
 *    tags: [Dormitorios]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#components/schemas/Dormitorios'
 *    responses:
 *      200:
 *        description: Producto creado correctamente
 */     
router.post("/dormitorios", (req, res) => {
    const dor = dorModel(req.body);
    dor.save()
          .then((data) => res.json(data))
          .catch((error) => res.json ({mensaje: error})); 
});

/**
 * @swagger
 * /api/dormitorios:
 *  get:
 *    summary: Listar todos los productos
 *    tags: [Dormitorios]
 *    responses:
 *      200:
 *        description: Productos listados correctamente
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *            items:
 *              $ref: '#components/schemas/Dormitorios'
 *  
 */
router.get("/dormitorios", (req, res) => {
    dorModel.find()
        .then((data) => res.json(data))
        .catch((error) => res.json ({mensaje: error}));  
});

/**
 * @swagger
 * /api/dormitorios/{id}:
 *  get:
 *    summary: Buscar un producto por id
 *    tags: [Dormitorios]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: id del producto a buscar
 *    responses:
 *      200:
 *        description: Producto por id encontrado
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#components/schemas/Dormitorios'
 *      404:
 *        description: No existe el producto
 */
router.get("/dormitorios/:id", (req, res) => {
    const {id} = req.params;
    dorModel.findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json ({mensaje: error}));  
});

/**
 * @swagger
 * /api/dormitorios/{id}:
 *  put:
 *    summary: Actualizar un producto por id
 *    tags: [Dormitorios]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: actualizar producto por id
 *    responses:
 *      200:
 *        description: producto actualizado
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#components/schemas/Dormitorios'
 *      404:
 *        description: No existe la actualizacion de dormitorio
 */
router.put("/dormitorios/:id", (req, res) => {
    const {id} = req.params;
    const {codigo, nombre, categoria, cantidad, costo} = req.body;
    dorModel
        .updateOne({_id : id}, {$set : {codigo, nombre, categoria, cantidad, costo}})
        .then((data) => res.json(data))
        .catch((error) => res.json ({mensaje: error})); 

});

/**
 * @swagger
 * /api/dormitorios/{id}:
 *  delete:
 *    summary: Eliminar productos por id
 *    tags: [Dormitorios]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: id del producto a eliminar
 *    responses:
 *      200:
 *        description: Producto eliminado
 *      404:
 *        description: No existe el producto
 */
router.delete("/dormitorios/:id", (req, res) => {
   const {id} = req.params;
   dorModel.deleteOne({_id : id})
        .then((data) => res.json(data))
        .catch((error) => res.json ({mensaje: error}));   
});

module.exports = router;