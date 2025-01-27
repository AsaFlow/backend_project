const db = require('../config/db');

// ✅ Obtener todos los registros de alimentación
exports.getAllAlimentos = async (req, res) => {
    try {
        const [results] = await db.query('SELECT * FROM tb_alimento');
        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los registros de alimentación' });
    }
};

// ✅ Obtener un registro por `IdAlim`
exports.getAlimentoById = async (req, res) => {
    const { IdAlim } = req.params;
    try {
        const [results] = await db.query('SELECT * FROM tb_alimento WHERE IdAlim = ?', [IdAlim]);
        if (results.length === 0) {
            return res.status(404).json({ error: 'Registro no encontrado' });
        }
        res.json(results[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el registro de alimentación' });
    }
};

// ✅ Crear un nuevo registro de alimentación
exports.createAlimento = async (req, res) => {
    const {
        Matricula, Alumno, Grupo, Tipo_Comida, Des_Comida, Fecha_Desayuno, Precio, Folio, Comentario,
        Atendio, Fecha_sistema, Hora_sistema
    } = req.body;

    try {
        const [result] = await db.query(
            `INSERT INTO tb_alimento (Matricula, Alumno, Grupo, Tipo_Comida, Des_Comida, Fecha_Desayuno, Precio, Folio, Comentario,
                Atendio, Fecha_sistema, Hora_sistema)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [Matricula, Alumno, Grupo, Tipo_Comida, Des_Comida, Fecha_Desayuno, Precio, Folio, Comentario,
                Atendio, Fecha_sistema, Hora_sistema]
        );

        res.status(201).json({ message: 'Registro de alimentación creado', IdAlim: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al registrar la alimentación' });
    }
};

// ✅ Actualizar un registro de alimentación por `IdAlim`
exports.updateAlimento = async (req, res) => {
    const { IdAlim } = req.params;
    const {
        Matricula, Alumno, Grupo, Tipo_Comida, Des_Comida, Fecha_Desayuno, Precio, Folio, Comentario,
        Atendio, Fecha_sistema, Hora_sistema
    } = req.body;

    try {
        const [result] = await db.query(
            `UPDATE tb_alimento SET Matricula = ?, Alumno = ?, Grupo = ?, Tipo_Comida = ?, Des_Comida = ?, Fecha_Desayuno = ?, Precio = ?, Folio = ?, Comentario = ?, 
                Atendio = ?, Fecha_sistema = ?, Hora_sistema = ?
            WHERE IdAlim = ?`,
            [Matricula, Alumno, Grupo, Tipo_Comida, Des_Comida, Fecha_Desayuno, Precio, Folio, Comentario,
                Atendio, Fecha_sistema, Hora_sistema, IdAlim]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Registro no encontrado' });
        }

        res.json({ message: 'Registro de alimentación actualizado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el registro de alimentación' });
    }
};

// ✅ Eliminar un registro por `IdAlim`
exports.deleteAlimento = async (req, res) => {
    const { IdAlim } = req.params;

    try {
        const [result] = await db.query('DELETE FROM tb_alimento WHERE IdAlim = ?', [IdAlim]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Registro no encontrado' });
        }
        res.json({ message: 'Registro de alimentación eliminado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar el registro' });
    }
};
