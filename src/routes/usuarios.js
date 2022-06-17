const express = require("express");
const router = express.Router();
const usuarioModel = require("../models/usuarios");

/**
 * @swagger
 * components:
 *  schemas:
 *    Usuarios:
 *      type: object
 *      properties:
 *        nombre:
 *          type: string
 *          description: Nombre del usuario
 *        apellido:
 *          type: string
 *          description: Apellido del usuario
 *        nameuser:
 *          type: string
 *          description: Nickname del usuario
 *        edad:
 *          type: integer
 *          description: Edad del usuario
 *        password:
 *          type: string
 *          description: Contraseña del usuario
 *        correo:
 *          type: string
 *          description: Correo del usuario
 *      required:
 *        - nombre
 *        - apellido
 *        - nameuser
 *        - edad
 *        - password
 *        - correo
 *      example:
 *        nombre: Jair
 *        apellido: Valdez
 *        nameuser: jairv
 *        edad: 20
 *        password: jaircertus
 *        correo: jair@certus.edu.pe
 */

/**
 * @swagger
 * /api/usuarios:
 *  post:
 *    summary: Crear un usuario
 *    tags: [Usuarios]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#components/schemas/Usuarios'
 *    responses:
 *      200:
 *        description: Usuario creado correctamente
 */     
router.post("/usuarios", (req, res) => {
    const user = usuarioModel(req.body);
    user.save()
        .then((data) => res.json(data))
        .catch((error) => res.json ({mensaje: error})); 
});

/**
 * @swagger
 * /api/usuarios:
 *  get:
 *    summary: Listar todos los usuarios
 *    tags: [Usuarios]
 *    responses:
 *      200:
 *        description: Usuarios listados correctamente
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *            items:
 *              $ref: '#components/schemas/Usuarios'
 *  
 */
router.get("/usuarios", (req, res) => {
    usuarioModel.find()
        .then((data) => res.json(data))
        .catch((error) => res.json ({mensaje: error}));  
});

/**
 * @swagger
 * /api/usuarios/{id}:
 *  get:
 *    summary: Buscar un usuario por id
 *    tags: [Usuarios]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: id del usuario a buscar
 *    responses:
 *      200:
 *        description: Usuario encontrado
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#components/schemas/Usuarios'
 *      404:
 *        description: No existe el usuario
 */
router.get("/usuarios/:id", (req, res) => {
    const {id} = req.params;
    usuarioModel.findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json ({mensaje: error}));  
});

/**
 * @swagger
 * /api/usuarios/{id}:
 *  put:
 *    summary: Actualizar un usuario por id
 *    tags: [Usuarios]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: actualizar usuario por id
 *    responses:
 *      200:
 *        description: Usuario no encontrado
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#components/schemas/Usuarios'
 *      404:
 *        description: id de usuario no existe
 */
router.put("/usuarios/:id", (req, res) => {
    const {id} = req.params;
    const {nombre, apellido, nameuser, edad, password, correo} = req.body;
    usuarioModel
        .updateOne({_id : id}, {$set : {nombre, apellido, nameuser, edad, password, correo}})
        .then((data) => res.json(data))
        .catch((error) => res.json ({mensaje: error})); 
});


/**
 * @swagger
 * /api/usuarios/{id}:
 *  delete:
 *    summary: Eliminar usuario por id
 *    tags: [Usuarios]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: id del usuario a eliminar
 *    responses:
 *      200:
 *        description: Usuario eliminado
 *      404:
 *        description: No existe el usuario
 */
router.delete("/usuarios/:id", (req, res) => {
   const {id} = req.params;
   usuarioModel.deleteOne({_id : id})
        .then((data) => res.json(data))
        .catch((error) => res.json ({mensaje: error}));   
});

module.exports = router;