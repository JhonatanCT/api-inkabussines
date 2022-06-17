const express = require("express");
const router = express.Router();
const muebleModel = require("../models/muebles");

/**
 * @swagger
 * components:
 *  schemas:
 *    Categoria:Muebles:
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
 *        codigo: 20
 *        nombre: Cama paraiso 2plz
 *        categoria: Muebles
 *        cantidad: 40
 *        costo: 699.90
 */

/**
 * @swagger
 * /api/muebles:
 *  post:
 *    summary: Crear un producto
 *    tags: [Muebles]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#components/schemas/Muebles'
 *    responses:
 *      200:
 *        description: Producto creado correctamente
 */     
router.post("/muebles", (req, res) => {
    const mueble = muebleModel(req.body);
    mueble.save()
          .then((data) => res.json(data))
          .catch((error) => res.json ({mensaje: error})); 
});

/**
 * @swagger
 * /api/muebles:
 *  get:
 *    summary: Listar todos los productos
 *    tags: [Muebles]
 *    responses:
 *      200:
 *        description: Productos listados correctamente
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *            items:
 *              $ref: '#components/schemas/Muebles'
 *  
 */
router.get("/muebles", (req, res) => {
    muebleModel.find()
        .then((data) => res.json(data))
        .catch((error) => res.json ({mensaje: error}));  
});

/**
 * @swagger
 * /api/muebles/{id}:
 *  get:
 *    summary: Buscar un producto por id
 *    tags: [Muebles]
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
 *                $ref: '#components/schemas/Muebles'
 *      404:
 *        description: No existe el producto
 */
router.get("/muebles/:id", (req, res) => {
    const {id} = req.params;
    muebleModel.findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json ({mensaje: error}));  
});

/**
 * @swagger
 * /api/muebles/{id}:
 *  put:
 *    summary: Actualizar un producto por id
 *    tags: [Muebles]
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
 *                $ref: '#components/schemas/Muebles'
 *      404:
 *        description: No existe la actualizacion de muebles
 */
router.put("/muebles/:id", (req, res) => {
    const {id} = req.params;
    const {codigo, nombre, categoria, cantidad, costo} = req.body;
    muebleModel
        .updateOne({_id : id}, {$set : {codigo, nombre, categoria, cantidad, costo}})
        .then((data) => res.json(data))
        .catch((error) => res.json ({mensaje: error})); 

});

/**
 * @swagger
 * /api/muebles/{id}:
 *  delete:
 *    summary: Eliminar muebles por id
 *    tags: [Muebles]
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
router.delete("/muebles/:id", (req, res) => {
   const {id} = req.params;
   muebleModel.deleteOne({_id : id})
        .then((data) => res.json(data))
        .catch((error) => res.json ({mensaje: error}));   
});

module.exports = router;