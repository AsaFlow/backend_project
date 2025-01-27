const express = require('express');
const router = express.Router();
const altaAlumnoController = require('../controllers/altaAlumnoController');

// Rutas para alumnos (usando Matrícula como identificador único)
router.get('/', altaAlumnoController.getAllAlumnos);
router.get('/:matricula', altaAlumnoController.getAlumnoByMatricula);
router.post('/', altaAlumnoController.createAlumno);
router.put('/:matricula', altaAlumnoController.updateAlumno);
router.delete('/:matricula', altaAlumnoController.deleteAlumno);

module.exports = router;
