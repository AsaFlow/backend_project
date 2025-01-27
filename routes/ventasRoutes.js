const express = require('express');
const router = express.Router();
const ventasController = require('../controllers/ventasController');

// Rutas para ventas (usando FOLIO en lugar de ID)
router.get('/', ventasController.getAllVentas);
router.get('/:folio', ventasController.getVentaByFolio);
router.post('/', ventasController.createVenta);
router.put('/:folio', ventasController.updateVenta);
router.delete('/:folio', ventasController.deleteVenta);

module.exports = router;
