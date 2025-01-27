const express = require('express');
const router = express.Router();
const movDiarioController = require('../controllers/movDiarioController');

// Rutas para movimientos diarios
router.get('/', movDiarioController.getAllMovimientos);
router.get('/:id', movDiarioController.getMovimientoById);
router.post('/', movDiarioController.createMovimiento);
router.put('/:id', movDiarioController.updateMovimiento);
router.delete('/:id', movDiarioController.deleteMovimiento);

module.exports = router;
