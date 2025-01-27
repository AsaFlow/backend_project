const express = require('express');
const router = express.Router();
const incidenciasController = require('../controllers/incidenciasController');

// Rutas CRUD para incidencias
router.get('/', incidenciasController.getAllIncidencias);
router.get('/:id', incidenciasController.getIncidenciaById);
router.post('/', incidenciasController.createIncidencia);
router.put('/:id', incidenciasController.updateIncidencia);
router.delete('/:id', incidenciasController.deleteIncidencia);

module.exports = router;
