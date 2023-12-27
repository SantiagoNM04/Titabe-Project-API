const connectDB = require('../config/connectDB.js'); // Traemos la conexion hecha para utilizar el metodo query.
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const path = require('path');

// Envia informacion al Front a traves de una peticion GET.
const showProducts = async(req,res) => {

    connectDB.query('SELECT * FROM products',(err,data) => {
      if (err) {
        res.status(500).json({"message":">> Error getting data products"}, err);
      } 
       
      res.status(200).send(data);
    })
};

// Recibe informacion del front del usuario que se ha registrado en la database.
const userRegister = async (req, res) => {

  // Informacion traida del front
  const { username, email, password } = req.body;

  // Encriptacion de password
  const hashPassword = await bcrypt.hash(password, 10);

  // Creacion y carga a la database del nuevo usuario
  connectDB.query('INSERT INTO users(username, email, password) VALUES(?,?,?)', [username, email, hashPassword], async(err, data) => {
    if (err) {
      res.status(500).json({ "message": ">> Error in the register"});
    };

    res.status(201).json({ "message": ">> User created" });
  });
};


// Recibe informacion del front y realiza una autenticacion del usuario que intenta loguearse.
const userLogin = async(req,res) => {

  // Informacion traida del front
  const { email, password } = req.body;

  connectDB.query('SELECT * FROM users WHERE email = ?', [email], async(err,dataAuth) => {

    if (err) {
      res.status(500).json({"message" : ">> Error in the login"})
    } 

    if (dataAuth.length > 0) {
      const user = dataAuth[0];
      
      // Verifica la contraseña 
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        const token = jwt.sign({ email: user.email }, "secret", { expiresIn: '1h' });
        res.status(200).send(user.username)

      } else {
        // Contraseña no válida
        res.status(401).json({ "message": ">> Invalid credentials" });
      }
    } else {
      // No se encontró ningún usuario con el correo electrónico proporcionado
      res.status(404).json({ "message": ">> User not found" });
    }

  });
};

// Crea nuevos datos especificados por el usuario. 
const newProduct = async(req,res) => {
  const { product, price, stock, availableStock } = req.body;
  const image = "http://localhost:4300/" + req.file.path;
  console.log(product, price, stock, availableStock, image)
  
  connectDB.query('INSERT INTO products(product, price, stock, availableStock, ruta_imagen) VALUES(?,?,?,?,?)', [product,price,stock,availableStock,image], async(err,result) => {
    if(err) {
      console.log('>> Error inserting the data: ' + err.message);
      res.status(500).json({message: '>> Error inserting the product in the database'});
      return;
    }

    res.status(200).json({message: '>> Data inserted succesfully'})
  });

};

// Modifica un dato especificado por el usuario.
const modifyProduct = async(req,res) => {
  
};

// Borra informacion de la database especificada por el usuario.
const deleteProduct = async(req,res) => {
  const idParams = req.params.id;
  const { id } = req.body;

  dbConnection.query("DELETE FROM products WHERE id=?",[id],(err,data)=>{
    if(err){
      res.status(500).json({"massege":"Internal server error"});
    }

    res.status(200).json({"message":"Product deleted from the database"});

   });
};


module.exports = { showProducts, userRegister, userLogin, newProduct, modifyProduct, deleteProduct };