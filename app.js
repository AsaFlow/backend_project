const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const compression = require('compression');
require('dotenv').config();

// Importar rutas
const usuariosRoutes = require('./routes/usuariosRoutes');
const incidenciasRoutes = require('./routes/incidenciasRoutes');
const movDiarioRoutes = require('./routes/movDiarioRoutes');
const permisosRoutes = require('./routes/permisosRoutes');
const productosRoutes = require('./routes/productosRoutes');
const ventasRoutes = require('./routes/ventasRoutes');
const altaAlumnoRoutes = require('./routes/altaAlumnoRoutes');
const asignacionesRoutes = require('./routes/asignacionesRoutes');
const asistenciaRoutes = require('./routes/asistenciaRoutes');
const atrasosRoutes = require('./routes/atrasosRoutes');
const citasRoutes = require('./routes/citasRoutes');
const inscripcionRoutes = require('./routes/inscripcionRoutes');
const mensualidadesRoutes = require('./routes/mensualidadesRoutes');
const papasRoutes = require('./routes/papasRoutes');
const qrRoutes = require('./routes/qrRoutes');
const tallaPesoRoutes = require('./routes/tallaPesoRoutes');
const tbAlimentoRoutes = require('./routes/tbAlimentoRoutes');

const app = express();

// 🚀 Seguridad y Optimización
app.use(cors({
    origin: '*',  // Permitir acceso desde cualquier origen
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(helmet());             
app.use(compression());        

// 🚦 Limitador de solicitudes
const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, 
  max: 500, 
  message: { error: 'Demasiadas solicitudes, inténtalo más tarde.' }
});
app.use(limiter);

// Middleware para JSON
app.use(express.json());

// 📌 Rutas
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/incidencias', incidenciasRoutes);
app.use('/api/movDiario', movDiarioRoutes);
app.use('/api/permisos', permisosRoutes);
app.use('/api/productos', productosRoutes);
app.use('/api/ventas', ventasRoutes);
app.use('/api/alumnos', altaAlumnoRoutes);
app.use('/api/asignaciones', asignacionesRoutes);
app.use('/api/asistencia', asistenciaRoutes);
app.use('/api/atrasos', atrasosRoutes);
app.use('/api/citas', citasRoutes);
app.use('/api/inscripciones', inscripcionRoutes);
app.use('/api/mensualidades', mensualidadesRoutes);
app.use('/api/papas', papasRoutes);
app.use('/api/qr', qrRoutes);
app.use('/api/talla_peso', tallaPesoRoutes);
app.use('/api/alimentos', tbAlimentoRoutes);

// 🎯 Manejo de errores para rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// 📌 Handler para Vercel
const handler = (req, res) => {
  app(req, res);
};

module.exports = handler;

