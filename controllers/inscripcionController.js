const db = require('../config/db');

// ✅ Obtener todas las inscripciones
exports.getAllInscripciones = async (req, res) => {
    try {
        const [results] = await db.query('SELECT * FROM inscripcion');
        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener las inscripciones' });
    }
};

// ✅ Obtener una inscripción por `id_inscripcion`
exports.getInscripcionById = async (req, res) => {
    const { id_inscripcion } = req.params;
    try {
        const [results] = await db.query('SELECT * FROM inscripcion WHERE id_inscripcion = ?', [id_inscripcion]);
        if (results.length === 0) {
            return res.status(404).json({ error: 'Inscripción no encontrada' });
        }
        res.json(results[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener la inscripción' });
    }
};

// ✅ Crear una nueva inscripción
exports.createInscripcion = async (req, res) => {
    const {
        matricula, nombre, ciclo_escolar, concepto, cantidad, cuenta_dep, forma_pago, fecha_pago, id_pago,
        no_cheque, inst_bancaria, hora_sistema, fecha_sistema, fecha_hora_sistema, atendio, folio,
        comentario, grado, nivel, modalidad, cant_mod, descuento, Cant_T, Ajuste, colegio, factura, grupo
    } = req.body;

    try {
        const [result] = await db.query(
            `INSERT INTO inscripcion (matricula, nombre, ciclo_escolar, concepto, cantidad, cuenta_dep, forma_pago, fecha_pago, id_pago,
                no_cheque, inst_bancaria, hora_sistema, fecha_sistema, fecha_hora_sistema, atendio, folio,
                comentario, grado, nivel, modalidad, cant_mod, descuento, Cant_T, Ajuste, colegio, factura, grupo)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [matricula, nombre, ciclo_escolar, concepto, cantidad, cuenta_dep, forma_pago, fecha_pago, id_pago,
                no_cheque, inst_bancaria, hora_sistema, fecha_sistema, fecha_hora_sistema, atendio, folio,
                comentario, grado, nivel, modalidad, cant_mod, descuento, Cant_T, Ajuste, colegio, factura, grupo]
        );

        res.status(201).json({ message: 'Inscripción creada', id_inscripcion: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al registrar la inscripción' });
    }
};

// ✅ Actualizar una inscripción por `id_inscripcion`
exports.updateInscripcion = async (req, res) => {
    const { id_inscripcion } = req.params;
    const {
        matricula, nombre, ciclo_escolar, concepto, cantidad, cuenta_dep, forma_pago, fecha_pago, id_pago,
        no_cheque, inst_bancaria, hora_sistema, fecha_sistema, fecha_hora_sistema, atendio, folio,
        comentario, grado, nivel, modalidad, cant_mod, descuento, Cant_T, Ajuste, colegio, factura, grupo
    } = req.body;

    try {
        const [result] = await db.query(
            `UPDATE inscripcion SET matricula = ?, nombre = ?, ciclo_escolar = ?, concepto = ?, cantidad = ?, cuenta_dep = ?, forma_pago = ?, fecha_pago = ?, id_pago = ?,
                no_cheque = ?, inst_bancaria = ?, hora_sistema = ?, fecha_sistema = ?, fecha_hora_sistema = ?, atendio = ?, folio = ?,
                comentario = ?, grado = ?, nivel = ?, modalidad = ?, cant_mod = ?, descuento = ?, Cant_T = ?, Ajuste = ?, colegio = ?, factura = ?, grupo = ?
            WHERE id_inscripcion = ?`,
            [matricula, nombre, ciclo_escolar, concepto, cantidad, cuenta_dep, forma_pago, fecha_pago, id_pago,
                no_cheque, inst_bancaria, hora_sistema, fecha_sistema, fecha_hora_sistema, atendio, folio,
                comentario, grado, nivel, modalidad, cant_mod, descuento, Cant_T, Ajuste, colegio, factura, grupo, id_inscripcion]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Inscripción no encontrada' });
        }

        res.json({ message: 'Inscripción actualizada' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar la inscripción' });
    }
};

// ✅ Eliminar una inscripción por `id_inscripcion`
exports.deleteInscripcion = async (req, res) => {
    const { id_inscripcion } = req.params;

    try {
        const [result] = await db.query('DELETE FROM inscripcion WHERE id_inscripcion = ?', [id_inscripcion]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Inscripción no encontrada' });
        }
        res.json({ message: 'Inscripción eliminada' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar la inscripción' });
    }
};
