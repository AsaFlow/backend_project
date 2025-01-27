const db = require('../config/db');

// ✅ Obtener todas las mensualidades
exports.getAllMensualidades = async (req, res) => {
    try {
        const [results] = await db.query('SELECT * FROM mensualidades');
        res.json(results);
    } catch (error) {
        console.error("❌ Error al obtener las mensualidades:", error);
        res.status(500).json({ error: 'Error al obtener las mensualidades', details: error.sqlMessage });
    }
};

// ✅ Obtener una mensualidad por `id_mensualidad`
exports.getMensualidadById = async (req, res) => {
    const { id_mensualidad } = req.params;
    try {
        const [results] = await db.query('SELECT * FROM mensualidades WHERE id_mensualidad = ?', [id_mensualidad]);
        if (results.length === 0) {
            return res.status(404).json({ error: 'Mensualidad no encontrada' });
        }
        res.json(results[0]);
    } catch (error) {
        console.error("❌ Error al obtener la mensualidad:", error);
        res.status(500).json({ error: 'Error al obtener la mensualidad', details: error.sqlMessage });
    }
};

// ✅ Crear una nueva mensualidad
exports.createMensualidad = async (req, res) => {
    console.log("📌 Datos recibidos:", req.body);

    const {
        matricula, estado, ciclo_escolar, concepto, cantidad, cuenta_dep, forma_pago, fecha_pago, id_pago,
        no_cheque, inst_bancaria, hora_sistema, fecha_sistema, fecha_hora_sistema, cargo, atendio, folio,
        comentario, cantidad_t, eliminado
    } = req.body;

    try {
        const query = `INSERT INTO mensualidades 
            (\`matricula\`, \`estado\`, \`ciclo_escolar\`, \`concepto\`, \`cantidad\`, \`cuenta_dep\`, \`forma_pago\`, \`fecha_pago\`, \`id_pago\`,
             \`no_cheque\`, \`inst_bancaria\`, \`hora_sistema\`, \`fecha_sistema\`, \`fecha_hora_sistema\`, \`cargo\`, \`atendio\`, \`folio\`,
             \`comentario\`, \`cantidad_t\`, \`eliminado\`)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`; // Cambiamos a 20 valores

        const values = [
            matricula || null, estado || null, ciclo_escolar || null, concepto || null, cantidad || 0, 
            cuenta_dep || null, forma_pago || null, fecha_pago || null, id_pago || null,
            no_cheque || null, inst_bancaria || null, hora_sistema || '00:00:00', fecha_sistema || new Date(),
            fecha_hora_sistema || new Date(), cargo || 0, atendio || null, folio || null,
            comentario || null, cantidad_t || 0, eliminado || 0
        ];

        console.log("📌 Query SQL generada:", query);
        console.log("📌 Valores que se enviarán:", values);

        const [result] = await db.query(query, values);

        res.status(201).json({ message: 'Mensualidad creada', id_mensualidad: result.insertId });

    } catch (error) {
        console.error("❌ Error en SQL:", error);
        res.status(500).json({ error: 'Error al registrar la mensualidad', details: error.sqlMessage });
    }
};


// ✅ Actualizar una mensualidad por `id_mensualidad`
exports.updateMensualidad = async (req, res) => {
    const { id_mensualidad } = req.params;
    const {
        matricula, estado, ciclo_escolar, concepto, cantidad, cuenta_dep, forma_pago, fecha_pago, id_pago,
        no_cheque, inst_bancaria, hora_sistema, fecha_sistema, fecha_hora_sistema, cargo, atendio, folio,
        comentario, cantidad_t, eliminado
    } = req.body;

    try {
        const [result] = await db.query(
            `UPDATE mensualidades SET matricula = ?, estado = ?, ciclo_escolar = ?, concepto = ?, cantidad = ?, cuenta_dep = ?, forma_pago = ?, fecha_pago = ?, id_pago = ?,
                no_cheque = ?, inst_bancaria = ?, hora_sistema = ?, fecha_sistema = ?, fecha_hora_sistema = ?, cargo = ?, atendio = ?, folio = ?,
                comentario = ?, cantidad_t = ?, eliminado = ?
            WHERE id_mensualidad = ?`,
            [matricula, estado, ciclo_escolar, concepto, cantidad, cuenta_dep, forma_pago, fecha_pago, id_pago,
                no_cheque, inst_bancaria, hora_sistema, fecha_sistema, fecha_hora_sistema, cargo, atendio, folio,
                comentario, cantidad_t, eliminado, id_mensualidad]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Mensualidad no encontrada' });
        }

        res.json({ message: 'Mensualidad actualizada' });
    } catch (error) {
        console.error("❌ Error al actualizar la mensualidad:", error);
        res.status(500).json({ error: 'Error al actualizar la mensualidad', details: error.sqlMessage });
    }
};

// ✅ Eliminar una mensualidad por `id_mensualidad`
exports.deleteMensualidad = async (req, res) => {
    const { id_mensualidad } = req.params;

    try {
        const [result] = await db.query('DELETE FROM mensualidades WHERE id_mensualidad = ?', [id_mensualidad]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Mensualidad no encontrada' });
        }
        res.json({ message: 'Mensualidad eliminada' });
    } catch (error) {
        console.error("❌ Error al eliminar la mensualidad:", error);
        res.status(500).json({ error: 'Error al eliminar la mensualidad', details: error.sqlMessage });
    }
};
