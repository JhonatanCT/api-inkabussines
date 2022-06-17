const express = require("express");
const router = express.Router();
const limpModel = require("../models/limpiezas");

/**
 * @swagger
 * components:
 *  schemas:
 *    Categoria:Limpiezas:
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
 *        codigo: 16
 *        nombre: Lejia Clorox
 *        categoria: Limpieza
 *        cantidad: 35
 *        costo: 4.90
 */

/**
 * @swagger
 * /api/limpiezas:
 *  post:
 *    summary: Crear un producto
 *    tags: [Limpieza]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#components/schemas/Limpieza'
 *    responses:
 *      200:
 *        description: Producto creado correctamente
 */     
router.post("/limpiezas", (req, res) => {
    const limp = limpModel(req.body);
    limp.save()
          .then((data) => res.json(data))
          .catch((error) => res.json ({mensaje: error})); 
});

/**
 * @swagger
 * /api/limpiezas:
 *  get:
 *    summary: Listar todos los productos
 *    tags: [Limpieza]
 *    responses:
 *      200:
 *        description: Productos listados correctamente
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *            items:
 *              $ref: '#components/schemas/Limpiezas'
 *  
 */
router.get("/limpiezas", (req, res) => {
    limpModel.find()
        .then((data) => res.json(data))
        .catch((error) => res.json ({mensaje: error}));  
});

/**
 * @swagger
 * /api/limpiezas/{id}:
 *  get:
 *    summary: Buscar un producto por id
 *    tags: [Limpieza]
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
 *                $ref: '#components/schemas/Limpieza'
 *      404:
 *        description: No existe el producto
 */
router.get("/limpiezas/:id", (req, res) => {
    const {id} = req.params;
    limpModel.findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json ({mensaje: error}));  
});

/**
 * @swagger
 * /api/limpiezas/{id}:
 *  put:
 *    summary: Actualizar un producto por id
 *    tags: [Limpieza]
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
 *                $ref: '#components/schemas/Limpieza'
 *      404:
 *        description: No existe la actualizacion de limpieza
 */
router.put("/limpiezas/:id", (req, res) => {
    const {id} = req.params;
    const {codigo, nombre, categoria, cantidad, costo} = req.body;
    limpModel
        .updateOne({_id : id}, {$set : {codigo, nombre, categoria, cantidad, costo}})
        .then((data) => res.json(data))
        .catch((error) => res.json ({mensaje: error})); 

});

/**
 * @swagger
 * /api/limpiezas/{id}:
 *  delete:
 *    summary: Eliminar productos por id
 *    tags: [Limpieza]
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
router.delete("/limpiezas/:id", (req, res) => {
   const {id} = req.params;
   limpModel.deleteOne({_id : id})
        .then((data) => res.json(data))
        .catch((error) => res.json ({mensaje: error}));   
});

module.exports = router;