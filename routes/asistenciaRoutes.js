const express = require('express');
const router = express.Router();
const asistenciaController = require('../controllers/asistenciaController');

// Rutas para asistencia
router.get('/', asistenciaController.getAllAsistencias);
router.get('/:id_asistencia', asistenciaController.getAsistenciaById);
router.post('/', asistenciaController.createAsistencia);
router.put('/:id_asistencia', asistenciaController.updateAsistencia);
router.delete('/:id_asistencia', asistenciaController.deleteAsistencia);

module.exports = router;
