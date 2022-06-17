//Llamada de paquetes
const express = require("express");
const mongoose = require("mongoose");
const clientes = require("./routes/clientes");
const muebles = require("./routes/muebles");
const licores = require("./routes/licores");
const dormitorios = require("./routes/dormitorios");
const limpiezas = require("./routes/limpiezas");
const mascotas = require("./routes/mascotas");
const usuarios = require("./routes/usuarios");
const reclamos = require("./routes/reclamos");
require("dotenv").config();
const path = require("path");

//Uso de swagger
const swaggerUI = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerSpecs = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Documentación API Inkabussines",
      version: "1.0.0"
    },
    servers: [
      {
        url: "http://localhost:5000"
      }
    ]
  },
  apis: [ ` ${path.join(__dirname, "./routes/*.js")} ` ]
}

//Inicializando variables
const app = express();
const port = 5000;

//Configuraciones
app.use(express.json());
app.use("/api", clientes);
app.use("/api", muebles);
app.use("/api", licores);
app.use("/api", dormitorios);
app.use("/api", limpiezas);
app.use("/api", mascotas);
app.use("/api", usuarios);
app.use("/api", reclamos);
app.use("/api-doc-inkabussines", swaggerUI.serve, swaggerUI.setup(swaggerJSDoc(swaggerSpecs)));

//Rutas
app.get('/', (req, res) => {
  res.send("Bienvenidos a las APIS Rest de INKABUSSINES");  
});

//Test MongoDB
mongoose.connect(process.env.mongodb_conexion)
  .then(() => console.log("Conexión excelente a MongoDBAtlas"))
  .catch((error) => console.log(error))

//Servidor
app.listen(5000, () => console.log("Servidor activo en el puerto:", port));