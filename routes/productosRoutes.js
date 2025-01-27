const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productosController');

// Rutas para productos
router.get('/', productosController.getAllProductos);
router.get('/:clave', productosController.getProductoByClave);
router.post('/', productosController.createProducto);
router.put('/:clave', productosController.updateProducto);
router.delete('/:clave', productosController.deleteProducto);

module.exports = router;
