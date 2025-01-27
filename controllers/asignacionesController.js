const db = require('../config/db');

// ✅ Obtener todas las asignaciones
exports.getAllAsignaciones = async (req, res) => {
    try {
        const [results] = await db.query('SELECT * FROM asignaciones');
        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener las asignaciones' });
    }
};

// ✅ Obtener una asignación por `task_id`
exports.getAsignacionById = async (req, res) => {
    const { task_id } = req.params;
    try {
        const [results] = await db.query('SELECT * FROM asignaciones WHERE task_id = ?', [task_id]);
        if (results.length === 0) {
            return res.status(404).json({ error: 'Asignación no encontrada' });
        }
        res.json(results[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener la asignación' });
    }
};

// ✅ Crear una nueva asignación
exports.createAsignacion = async (req, res) => {
    const { usuario_id, titulo, descripcion, estatus, prioridad, fecha_limite, fecha_sist, actualizado, asignado, rela_inc } = req.body;

    try {
        const [result] = await db.query(
            'INSERT INTO asignaciones (usuario_id, titulo, descripcion, estatus, prioridad, fecha_limite, fecha_sist, actualizado, asignado, rela_inc) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [usuario_id, titulo, descripcion, estatus, prioridad, fecha_limite, fecha_sist, actualizado, asignado, rela_inc]
        );
        res.status(201).json({ message: 'Asignación creada', task_id: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear la asignación' });
    }
};

// ✅ Actualizar una asignación por `task_id`
exports.updateAsignacion = async (req, res) => {
    const { task_id } = req.params;
    const { usuario_id, titulo, descripcion, estatus, prioridad, fecha_limite, fecha_sist, actualizado, asignado, rela_inc } = req.body;

    try {
        const [result] = await db.query(
            'UPDATE asignaciones SET usuario_id = ?, titulo = ?, descripcion = ?, estatus = ?, prioridad = ?, fecha_limite = ?, fecha_sist = ?, actualizado = ?, asignado = ?, rela_inc = ? WHERE task_id = ?',
            [usuario_id, titulo, descripcion, estatus, prioridad, fecha_limite, fecha_sist, actualizado, asignado, rela_inc, task_id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Asignación no encontrada' });
        }

        res.json({ message: 'Asignación actualizada' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar la asignación' });
    }
};

// ✅ Eliminar una asignación por `task_id`
exports.deleteAsignacion = async (req, res) => {
    const { task_id } = req.params;

    try {
        const [result] = await db.query('DELETE FROM asignaciones WHERE task_id = ?', [task_id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Asignación no encontrada' });
        }
        res.json({ message: 'Asignación eliminada' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar la asignación' });
    }
};
