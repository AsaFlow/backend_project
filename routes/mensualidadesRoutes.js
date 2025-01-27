const express = require('express');
const router = express.Router();
const mensualidadesController = require('../controllers/mensualidadesController');

// Rutas para mensualidades
router.get('/', mensualidadesController.getAllMensualidades);
router.get('/:id_mensualidad', mensualidadesController.getMensualidadById);
router.post('/', mensualidadesController.createMensualidad);
router.put('/:id_mensualidad', mensualidadesController.updateMensualidad);
router.delete('/:id_mensualidad', mensualidadesController.deleteMensualidad);

module.exports = router;
