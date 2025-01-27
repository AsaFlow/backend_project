const db = require('../config/db');

// ✅ Obtener todos los registros de talla y peso
exports.getAllTallaPeso = async (req, res) => {
    try {
        const [results] = await db.query('SELECT * FROM talla_peso');
        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los registros de talla y peso' });
    }
};

// ✅ Obtener un registro por `id_talla_peso`
exports.getTallaPesoById = async (req, res) => {
    const { id_talla_peso } = req.params;
    try {
        const [results] = await db.query('SELECT * FROM talla_peso WHERE id_talla_peso = ?', [id_talla_peso]);
        if (results.length === 0) {
            return res.status(404).json({ error: 'Registro no encontrado' });
        }
        res.json(results[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el registro de talla y peso' });
    }
};

// ✅ Crear un nuevo registro de talla y peso
exports.createTallaPeso = async (req, res) => {
    const { matricula, ciclo_escolar, fecha, hora, talla, peso, folio } = req.body;

    try {
        const [result] = await db.query(
            `INSERT INTO talla_peso (matricula, ciclo_escolar, fecha, hora, talla, peso, folio)
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [matricula, ciclo_escolar, fecha, hora, talla, peso, folio]
        );

        res.status(201).json({ message: 'Registro de talla y peso creado', id_talla_peso: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al registrar la talla y peso' });
    }
};

// ✅ Actualizar un registro de talla y peso por `id_talla_peso`
exports.updateTallaPeso = async (req, res) => {
    const { id_talla_peso } = req.params;
    const { matricula, ciclo_escolar, fecha, hora, talla, peso, folio } = req.body;

    try {
        const [result] = await db.query(
            `UPDATE talla_peso SET matricula = ?, ciclo_escolar = ?, fecha = ?, hora = ?, talla = ?, peso = ?, folio = ?
            WHERE id_talla_peso = ?`,
            [matricula, ciclo_escolar, fecha, hora, talla, peso, folio, id_talla_peso]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Registro no encontrado' });
        }

        res.json({ message: 'Registro de talla y peso actualizado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el registro de talla y peso' });
    }
};

// ✅ Eliminar un registro por `id_talla_peso`
exports.deleteTallaPeso = async (req, res) => {
    const { id_talla_peso } = req.params;

    try {
        const [result] = await db.query('DELETE FROM talla_peso WHERE id_talla_peso = ?', [id_talla_peso]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Registro no encontrado' });
        }
        res.json({ message: 'Registro de talla y peso eliminado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar el registro' });
    }
};
