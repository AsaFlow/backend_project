const express = require('express');
const router = express.Router();
const tallaPesoController = require('../controllers/tallaPesoController');

// Rutas para `talla_peso`
router.get('/', tallaPesoController.getAllTallaPeso);
router.get('/:id_talla_peso', tallaPesoController.getTallaPesoById);
router.post('/', tallaPesoController.createTallaPeso);
router.put('/:id_talla_peso', tallaPesoController.updateTallaPeso);
router.delete('/:id_talla_peso', tallaPesoController.deleteTallaPeso);

module.exports = router;
