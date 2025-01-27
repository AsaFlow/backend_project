const express = require('express');
const router = express.Router();
const citasController = require('../controllers/citasController');

// Rutas para citas
router.get('/', citasController.getAllCitas);
router.get('/:IdCita', citasController.getCitaById);
router.post('/', citasController.createCita);
router.put('/:IdCita', citasController.updateCita);
router.delete('/:IdCita', citasController.deleteCita);

module.exports = router;
