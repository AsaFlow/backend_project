const db = require('../config/db');

// ✅ Obtener todos los permisos
exports.getAllPermisos = async (req, res) => {
    try {
        const [results] = await db.query('SELECT * FROM Permisos');
        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los permisos' });
    }
};

// ✅ Obtener un permiso por ID
exports.getPermisoById = async (req, res) => {
    const { id } = req.params;
    try {
        const [results] = await db.query('SELECT * FROM Permisos WHERE ID_Permiso = ?', [id]);
        if (results.length === 0) {
            return res.status(404).json({ error: 'Permiso no encontrado' });
        }
        res.json(results[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el permiso' });
    }
};

// ✅ Crear un nuevo permiso
exports.createPermiso = async (req, res) => {
    const { ID_Usuario, Permiso, Valor } = req.body;

    try {
        const [result] = await db.query(
            'INSERT INTO Permisos (ID_Usuario, Permiso, Valor) VALUES (?, ?, ?)',
            [ID_Usuario, Permiso, Valor]
        );
        res.status(201).json({ message: 'Permiso creado', id: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear el permiso' });
    }
};

// ✅ Actualizar un permiso
exports.updatePermiso = async (req, res) => {
    const { id } = req.params;
    const { ID_Usuario, Permiso, Valor } = req.body;

    try {
        const [result] = await db.query(
            'UPDATE Permisos SET ID_Usuario = ?, Permiso = ?, Valor = ? WHERE ID_Permiso = ?',
            [ID_Usuario, Permiso, Valor, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Permiso no encontrado' });
        }

        res.json({ message: 'Permiso actualizado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el permiso' });
    }
};

// ✅ Eliminar un permiso
exports.deletePermiso = async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await db.query('DELETE FROM Permisos WHERE ID_Permiso = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Permiso no encontrado' });
        }
        res.json({ message: 'Permiso eliminado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar el permiso' });
    }
};
