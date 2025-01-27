const express = require('express');
const router = express.Router();
const asignacionesController = require('../controllers/asignacionesController');

// Rutas para asignaciones
router.get('/', asignacionesController.getAllAsignaciones);
router.get('/:task_id', asignacionesController.getAsignacionById);
router.post('/', asignacionesController.createAsignacion);
router.put('/:task_id', asignacionesController.updateAsignacion);
router.delete('/:task_id', asignacionesController.deleteAsignacion);

module.exports = router;
