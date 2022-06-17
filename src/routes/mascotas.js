const express = require("express");
const router = express.Router();
const mascotModel = require("../models/mascotas");

/**
 * @swagger
 * components:
 *  schemas:
 *    Categoria:Mascotas:
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
 *        codigo: 5
 *        nombre: Correa para cachorro
 *        categoria: Mascotas
 *        cantidad: 20
 *        costo: 39.90
 */

/**
 * @swagger
 * /api/mascotas:
 *  post:
 *    summary: Crear un producto
 *    tags: [Mascotas]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#components/schemas/Mascotas'
 *    responses:
 *      200:
 *        description: Producto creado correctamente
 */     
router.post("/mascotas", (req, res) => {
    const mascot = mascotModel(req.body);
    mascot.save()
          .then((data) => res.json(data))
          .catch((error) => res.json ({mensaje: error})); 
});

/**
 * @swagger
 * /api/mascotas:
 *  get:
 *    summary: Listar todos los productos
 *    tags: [Mascotas]
 *    responses:
 *      200:
 *        description: Productos listados correctamente
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *            items:
 *              $ref: '#components/schemas/Mascotas'
 *  
 */
router.get("/mascotas", (req, res) => {
    mascotModel.find()
        .then((data) => res.json(data))
        .catch((error) => res.json ({mensaje: error}));  
});

/**
 * @swagger
 * /api/mascotas/{id}:
 *  get:
 *    summary: Buscar un producto por id
 *    tags: [Mascotas]
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
 *                $ref: '#components/schemas/Mascotas'
 *      404:
 *        description: No existe el producto
 */
router.get("/mascotas/:id", (req, res) => {
    const {id} = req.params;
    mascotModel.findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json ({mensaje: error}));  
});

/**
 * @swagger
 * /api/mascotas/{id}:
 *  put:
 *    summary: Actualizar un producto por id
 *    tags: [Mascotas]
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
 *                $ref: '#components/schemas/Mascotas'
 *      404:
 *        description: No existe la actualizacion de mascotas
 */
router.put("/mascotas/:id", (req, res) => {
    const {id} = req.params;
    const {codigo, nombre, categoria, cantidad, costo} = req.body;
    mascotModel
        .updateOne({_id : id}, {$set : {codigo, nombre, categoria, cantidad, costo}})
        .then((data) => res.json(data))
        .catch((error) => res.json ({mensaje: error})); 
});

/**
 * @swagger
 * /api/mascotas/{id}:
 *  delete:
 *    summary: Eliminar productos por id
 *    tags: [Mascotas]
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
router.delete("/mascotas/:id", (req, res) => {
   const {id} = req.params;
   mascotModel.deleteOne({_id : id})
        .then((data) => res.json(data))
        .catch((error) => res.json ({mensaje: error}));   
});

module.exports = router;