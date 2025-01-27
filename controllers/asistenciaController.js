const db = require('../config/db');

// ✅ Obtener todas las asistencias
exports.getAllAsistencias = async (req, res) => {
    try {
        const [results] = await db.query('SELECT * FROM asistencia');
        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener las asistencias' });
    }
};

// ✅ Obtener una asistencia por `id_asistencia`
exports.getAsistenciaById = async (req, res) => {
    const { id_asistencia } = req.params;
    try {
        const [results] = await db.query('SELECT * FROM asistencia WHERE id_asistencia = ?', [id_asistencia]);
        if (results.length === 0) {
            return res.status(404).json({ error: 'Asistencia no encontrada' });
        }
        res.json(results[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener la asistencia' });
    }
};

// ✅ Crear una nueva asistencia
exports.createAsistencia = async (req, res) => {
    const { matricula, nombre_alumno, grupo, plantel, email, fecha, hora, tipo_asistencia, grado, nivel, qr } = req.body;

    try {
        const [result] = await db.query(
            'INSERT INTO asistencia (matricula, nombre_alumno, grupo, plantel, email, fecha, hora, tipo_asistencia, grado, nivel, qr) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [matricula, nombre_alumno, grupo, plantel, email, fecha, hora, tipo_asistencia, grado, nivel, qr]
        );
        res.status(201).json({ message: 'Asistencia registrada', id_asistencia: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al registrar la asistencia' });
    }
};

// ✅ Actualizar una asistencia por `id_asistencia`
exports.updateAsistencia = async (req, res) => {
    const { id_asistencia } = req.params;
    const { matricula, nombre_alumno, grupo, plantel, email, fecha, hora, tipo_asistencia, grado, nivel, qr } = req.body;

    try {
        const [result] = await db.query(
            'UPDATE asistencia SET matricula = ?, nombre_alumno = ?, grupo = ?, plantel = ?, email = ?, fecha = ?, hora = ?, tipo_asistencia = ?, grado = ?, nivel = ?, qr = ? WHERE id_asistencia = ?',
            [matricula, nombre_alumno, grupo, plantel, email, fecha, hora, tipo_asistencia, grado, nivel, qr, id_asistencia]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Asistencia no encontrada' });
        }

        res.json({ message: 'Asistencia actualizada' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar la asistencia' });
    }
};

// ✅ Eliminar una asistencia por `id_asistencia`
exports.deleteAsistencia = async (req, res) => {
    const { id_asistencia } = req.params;

    try {
        const [result] = await db.query('DELETE FROM asistencia WHERE id_asistencia = ?', [id_asistencia]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Asistencia no encontrada' });
        }
        res.json({ message: 'Asistencia eliminada' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar la asistencia' });
    }
};
