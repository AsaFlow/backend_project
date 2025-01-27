const express = require('express');
const router = express.Router();
const inscripcionController = require('../controllers/inscripcionController');

// Rutas para inscripciones
router.get('/', inscripcionController.getAllInscripciones);
router.get('/:id_inscripcion', inscripcionController.getInscripcionById);
router.post('/', inscripcionController.createInscripcion);
router.put('/:id_inscripcion', inscripcionController.updateInscripcion);
router.delete('/:id_inscripcion', inscripcionController.deleteInscripcion);

module.exports = router;
