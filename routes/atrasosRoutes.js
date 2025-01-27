const express = require('express');
const router = express.Router();
const atrasosController = require('../controllers/atrasosController');

// Rutas para atrasos
router.get('/', atrasosController.getAllAtrasos);
router.get('/:id_atraso', atrasosController.getAtrasoById);
router.post('/', atrasosController.createAtraso);
router.put('/:id_atraso', atrasosController.updateAtraso);
router.delete('/:id_atraso', atrasosController.deleteAtraso);

module.exports = router;
