const db = require('../config/db');

// ✅ Obtener todos los registros QR
exports.getAllQrs = async (req, res) => {
    try {
        const [results] = await db.query('SELECT * FROM qr');
        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los registros QR' });
    }
};

// ✅ Obtener un registro QR por `id_qr`
exports.getQrById = async (req, res) => {
    const { id_qr } = req.params;
    try {
        const [results] = await db.query('SELECT * FROM qr WHERE id_qr = ?', [id_qr]);
        if (results.length === 0) {
            return res.status(404).json({ error: 'Registro QR no encontrado' });
        }
        res.json(results[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el registro QR' });
    }
};

// ✅ Crear un nuevo registro QR
exports.createQr = async (req, res) => {
    const { matricula, qr, nombre_alumno, nombre_tutor, email, mensaje, grado, nivel, colegio, fecha_nac } = req.body;

    try {
        const [result] = await db.query(
            `INSERT INTO qr (matricula, qr, nombre_alumno, nombre_tutor, email, mensaje, grado, nivel, colegio, fecha_nac)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [matricula, qr, nombre_alumno, nombre_tutor, email, mensaje, grado, nivel, colegio, fecha_nac]
        );

        res.status(201).json({ message: 'Registro QR creado', id_qr: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al registrar el código QR' });
    }
};

// ✅ Actualizar un registro QR por `id_qr`
exports.updateQr = async (req, res) => {
    const { id_qr } = req.params;
    const { matricula, qr, nombre_alumno, nombre_tutor, email, mensaje, grado, nivel, colegio, fecha_nac } = req.body;

    try {
        const [result] = await db.query(
            `UPDATE qr SET matricula = ?, qr = ?, nombre_alumno = ?, nombre_tutor = ?, email = ?, mensaje = ?, grado = ?, nivel = ?, colegio = ?, fecha_nac = ?
            WHERE id_qr = ?`,
            [matricula, qr, nombre_alumno, nombre_tutor, email, mensaje, grado, nivel, colegio, fecha_nac, id_qr]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Registro QR no encontrado' });
        }

        res.json({ message: 'Registro QR actualizado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el registro QR' });
    }
};

// ✅ Eliminar un registro QR por `id_qr`
exports.deleteQr = async (req, res) => {
    const { id_qr } = req.params;

    try {
        const [result] = await db.query('DELETE FROM qr WHERE id_qr = ?', [id_qr]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Registro QR no encontrado' });
        }
        res.json({ message: 'Registro QR eliminado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar el registro QR' });
    }
};
