const express = require('express');
const router = express.Router();
const qrController = require('../controllers/qrController');

// Rutas para QR
router.get('/', qrController.getAllQrs);
router.get('/:id_qr', qrController.getQrById);
router.post('/', qrController.createQr);
router.put('/:id_qr', qrController.updateQr);
router.delete('/:id_qr', qrController.deleteQr);

module.exports = router;
