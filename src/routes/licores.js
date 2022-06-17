const express = require("express");
const router = express.Router();
const licorModel = require("../models/licores");

/**
 * @swagger
 * components:
 *  schemas:
 *    Categoria:Licores:
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
 *        codigo: 50
 *        nombre: Red Label
 *        categoria: Licores
 *        cantidad: 15
 *        costo: 99.90
 */

/**
 * @swagger
 * /api/licores:
 *  post:
 *    summary: Crear un producto
 *    tags: [Licores]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#components/schemas/Licores'
 *    responses:
 *      200:
 *        description: Producto creado correctamente
 */     
router.post("/licores", (req, res) => {
    const licor = licorModel(req.body);
    licor.save()
          .then((data) => res.json(data))
          .catch((error) => res.json ({mensaje: error})); 
});

/**
 * @swagger
 * /api/licores:
 *  get:
 *    summary: Listar todos los productos
 *    tags: [Licores]
 *    responses:
 *      200:
 *        description: Productos listados correctamente
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *            items:
 *              $ref: '#components/schemas/Licores'
 *  
 */
router.get("/licores", (req, res) => {
    licorModel.find()
        .then((data) => res.json(data))
        .catch((error) => res.json ({mensaje: error}));  
});

/**
 * @swagger
 * /api/licores/{id}:
 *  get:
 *    summary: Buscar un producto por id
 *    tags: [Licores]
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
 *                $ref: '#components/schemas/Licores'
 *      404:
 *        description: No existe el producto
 */
router.get("/licores/:id", (req, res) => {
    const {id} = req.params;
    licorModel.findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json ({mensaje: error}));  
});

/**
 * @swagger
 * /api/licores/{id}:
 *  put:
 *    summary: Actualizar un producto por id
 *    tags: [Licores]
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
 *                $ref: '#components/schemas/Licores'
 *      404:
 *        description: No existe la actualizacion de limpieza
 */
router.put("/licores/:id", (req, res) => {
    const {id} = req.params;
    const {codigo, nombre, categoria, cantidad, costo} = req.body;
    licorModel
        .updateOne({_id : id}, {$set : {codigo, nombre, categoria, cantidad, costo}})
        .then((data) => res.json(data))
        .catch((error) => res.json ({mensaje: error})); 

});

/**
 * @swagger
 * /api/licores/{id}:
 *  delete:
 *    summary: Eliminar productos por id
 *    tags: [Licores]
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
router.delete("/licores/:id", (req, res) => {
   const {id} = req.params;
   licorModel.deleteOne({_id : id})
        .then((data) => res.json(data))
        .catch((error) => res.json ({mensaje: error}));   
});

module.exports = router;