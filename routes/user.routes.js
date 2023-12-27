const express = require('express');
const route = express.Router();
const { showProducts, userRegister, userLogin, newProduct, modifyProduct, deleteProduct } = require('../controllers/productsControllers.js');
const upload = require('../multer/uploadImage.js')

route.get('/shop', showProducts);
route.post('/user/register', userRegister);
route.post('/user/login', userLogin);
route.post('/shop/new', upload.single('image'), newProduct);
route.put('/shop/edit', modifyProduct);
route.delete('/shop/delete', deleteProduct)

module.exports = route;