const jwt = require('jsonwebtoken');

const usuarioPrueba = { id: 1, nombre: 'Juan Pérez', role: 'admin' };
const token = jwt.sign(usuarioPrueba, '123', { expiresIn: '1h' });

console.log('Token JWT:', token);
