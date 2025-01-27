const express = require('express');
const router = express.Router();
const papasController = require('../controllers/papasController');

// Rutas para papas
router.get('/', papasController.getAllPapas);
router.get('/:id_papa', papasController.getPapaById);
router.post('/', papasController.createPapa);
router.put('/:id_papa', papasController.updatePapa);
router.delete('/:id_papa', papasController.deletePapa);

module.exports = router;
