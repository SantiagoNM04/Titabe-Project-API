const express = require("express");
const morgan = require("morgan")
const cors = require("cors");
const routes = './routes/user.routes.js';

// Uso de servidor y puertos.
const server = express();
const port = process.env.PORT || 4300;

// Conexion a la base de datos.
require("./config/connectDB");

// Middlewares
server.use(morgan('dev')); // Paquete "Morgan" permite ver por consola las peticiones y respuestas del servidor
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({extended:true}));


server.use("/images",express.static("./images"));

// Redireccionamiento a rutas del servidor.
server.use('', require(routes));


// Escucha del puerto donde se ejecuta el servidor.
server.listen(port, () => {
  console.log(">> Server running on port " + port);
});
