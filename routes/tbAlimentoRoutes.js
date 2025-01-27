const express = require('express');
const router = express.Router();
const tbAlimentoController = require('../controllers/tbAlimentoController');

// Rutas para `tb_alimento`
router.get('/', tbAlimentoController.getAllAlimentos);
router.get('/:IdAlim', tbAlimentoController.getAlimentoById);
router.post('/', tbAlimentoController.createAlimento);
router.put('/:IdAlim', tbAlimentoController.updateAlimento);
router.delete('/:IdAlim', tbAlimentoController.deleteAlimento);

module.exports = router;
