const db = require('../config/db');

// ✅ Obtener todos los atrasos
exports.getAllAtrasos = async (req, res) => {
    try {
        const [results] = await db.query('SELECT * FROM atrasos');
        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los atrasos' });
    }
};

// ✅ Obtener un atraso por `id_atraso`
exports.getAtrasoById = async (req, res) => {
    const { id_atraso } = req.params;
    try {
        const [results] = await db.query('SELECT * FROM atrasos WHERE id_atraso = ?', [id_atraso]);
        if (results.length === 0) {
            return res.status(404).json({ error: 'Atraso no encontrado' });
        }
        res.json(results[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el atraso' });
    }
};

// ✅ Crear un nuevo atraso
exports.createAtraso = async (req, res) => {
    const { matricula, tutor, canal, argumento, contestacion, fecha, hora, atendio, folio } = req.body;

    try {
        const [result] = await db.query(
            'INSERT INTO atrasos (matricula, tutor, canal, argumento, contestacion, fecha, hora, atendio, folio) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [matricula, tutor, canal, argumento, contestacion, fecha, hora, atendio, folio]
        );
        res.status(201).json({ message: 'Atraso registrado', id_atraso: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al registrar el atraso' });
    }
};

// ✅ Actualizar un atraso por `id_atraso`
exports.updateAtraso = async (req, res) => {
    const { id_atraso } = req.params;
    const { matricula, tutor, canal, argumento, contestacion, fecha, hora, atendio, folio } = req.body;

    try {
        const [result] = await db.query(
            'UPDATE atrasos SET matricula = ?, tutor = ?, canal = ?, argumento = ?, contestacion = ?, fecha = ?, hora = ?, atendio = ?, folio = ? WHERE id_atraso = ?',
            [matricula, tutor, canal, argumento, contestacion, fecha, hora, atendio, folio, id_atraso]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Atraso no encontrado' });
        }

        res.json({ message: 'Atraso actualizado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el atraso' });
    }
};

// ✅ Eliminar un atraso por `id_atraso`
exports.deleteAtraso = async (req, res) => {
    const { id_atraso } = req.params;

    try {
        const [result] = await db.query('DELETE FROM atrasos WHERE id_atraso = ?', [id_atraso]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Atraso no encontrado' });
        }
        res.json({ message: 'Atraso eliminado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar el atraso' });
    }
};
