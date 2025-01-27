const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController'); 

// Verifica que cada ruta llama a una función válida
router.get('/', usuariosController.getAllUsuarios);
router.get('/:id', usuariosController.getUsuarioById);
router.post('/', usuariosController.createUsuario);
router.put('/:id', usuariosController.updateUsuario);
router.delete('/:id', usuariosController.deleteUsuario);

module.exports = router;

