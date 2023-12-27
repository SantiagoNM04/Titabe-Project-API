require("dotenv").config(); // Funcion para cargar variables de entorno (Datos sensibles).
const mysql2 = require("mysql2"); // Llamado del paquete mysql2 para realizar conexion.

// Info de la base de datos para realizar la conexion.
const infoDataBase = {
  host:process.env.DB_HOST,
  user:process.env.DB_USER,
  database:process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD
}

// Conexion a base de datos.
const connectDB = mysql2.createConnection(infoDataBase);

connectDB.connect((error)=>{
    if(error){
        if(error.code ==='ER_BAD_DB_ERROR' ){
                    console.log("!>> Error in the connection: "+ error.sqlMessage)
                }else{
                    console.log(error)
                }
    }else{
        console.log(">> Connected to the database")
    }
})

module.exports = connectDB;