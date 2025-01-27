const db = require('../config/db');

// Obtener todas las incidencias
exports.getAllIncidencias = async (req, res) => {
    try {
        const [results] = await db.query('SELECT * FROM Incidencias');
        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener las incidencias' });
    }
};

// Obtener una incidencia por ID
exports.getIncidenciaById = async (req, res) => {
    const { id } = req.params;
    try {
        const [results] = await db.query('SELECT * FROM Incidencias WHERE id_incidencia = ?', [id]);
        if (results.length === 0) {
            return res.status(404).json({ error: 'Incidencia no encontrada' });
        }
        res.json(results[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener la incidencia' });
    }
};

// Crear una nueva incidencia
exports.createIncidencia = async (req, res) => {
    const {
        matricula,
        reporta,
        incidencia,
        detalles,
        medidas_disciplinarias,
        compromisos,
        fecha_suceso,
        hora_suceso,
        detalles_2,
        detalles_3,
        detalles_4,
        fecha_sistema,
        hora_sistema,
        fecha_hora_sistema,
        folio,
        nombreAlumno
    } = req.body;

    try {
        const [result] = await db.query(
            `INSERT INTO Incidencias 
            (matricula, reporta, incidencia, detalles, medidas_disciplinarias, compromisos, fecha_suceso, hora_suceso, 
            detalles_2, detalles_3, detalles_4, fecha_sistema, hora_sistema, fecha_hora_sistema, folio, nombreAlumno) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [matricula, reporta, incidencia, detalles, medidas_disciplinarias, compromisos, fecha_suceso, hora_suceso,
            detalles_2, detalles_3, detalles_4, fecha_sistema, hora_sistema, fecha_hora_sistema, folio, nombreAlumno]
        );

        res.status(201).json({ message: 'Incidencia creada', id: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear la incidencia' });
    }
};

// Actualizar una incidencia
exports.updateIncidencia = async (req, res) => {
    const { id } = req.params;
    const {
        matricula,
        reporta,
        incidencia,
        detalles,
        medidas_disciplinarias,
        compromisos,
        fecha_suceso,
        hora_suceso,
        detalles_2,
        detalles_3,
        detalles_4,
        fecha_sistema,
        hora_sistema,
        fecha_hora_sistema,
        folio,
        nombreAlumno
    } = req.body;

    try {
        const [result] = await db.query(
            `UPDATE Incidencias SET 
            matricula = ?, reporta = ?, incidencia = ?, detalles = ?, medidas_disciplinarias = ?, compromisos = ?, 
            fecha_suceso = ?, hora_suceso = ?, detalles_2 = ?, detalles_3 = ?, detalles_4 = ?, fecha_sistema = ?, 
            hora_sistema = ?, fecha_hora_sistema = ?, folio = ?, nombreAlumno = ? 
            WHERE id_incidencia = ?`,
            [matricula, reporta, incidencia, detalles, medidas_disciplinarias, compromisos, fecha_suceso, hora_suceso,
            detalles_2, detalles_3, detalles_4, fecha_sistema, hora_sistema, fecha_hora_sistema, folio, nombreAlumno, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Incidencia no encontrada' });
        }

        res.json({ message: 'Incidencia actualizada exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar la incidencia' });
    }
};

// Eliminar una incidencia
exports.deleteIncidencia = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await db.query('DELETE FROM Incidencias WHERE id_incidencia = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Incidencia no encontrada' });
        }
        res.json({ message: 'Incidencia eliminada correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar la incidencia' });
    }
};
