const db = require('../config/db');

// ✅ Obtener todas las transacciones del movimiento diario
exports.getAllMovimientos = async (req, res) => {
    try {
        const [results] = await db.query('SELECT * FROM Mov_diario');
        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los movimientos diarios' });
    }
};

// ✅ Obtener un movimiento por ID
exports.getMovimientoById = async (req, res) => {
    const { id } = req.params;
    try {
        const [results] = await db.query('SELECT * FROM Mov_diario WHERE id_mov = ?', [id]);
        if (results.length === 0) {
            return res.status(404).json({ error: 'Movimiento no encontrado' });
        }
        res.json(results[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el movimiento' });
    }
};

// ✅ Crear un nuevo movimiento
exports.createMovimiento = async (req, res) => {
    const { Mat, Concepto, Categoria, Ingreso, Egreso, Forma_pago, Fecha, Hora, Atendio, Observaciones } = req.body;

    try {
        const [result] = await db.query(
            'INSERT INTO Mov_diario (Mat, Concepto, Categoria, Ingreso, Egreso, Forma_pago, Fecha, Hora, Atendio, Observaciones) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [Mat, Concepto, Categoria, Ingreso, Egreso, Forma_pago, Fecha, Hora, Atendio, Observaciones]
        );
        res.status(201).json({ message: 'Movimiento creado', id: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear el movimiento' });
    }
};

// ✅ Actualizar un movimiento
exports.updateMovimiento = async (req, res) => {
    const { id } = req.params;
    const { Mat, Concepto, Categoria, Ingreso, Egreso, Forma_pago, Fecha, Hora, Atendio, Observaciones } = req.body;

    try {
        const [result] = await db.query(
            'UPDATE Mov_diario SET Mat = ?, Concepto = ?, Categoria = ?, Ingreso = ?, Egreso = ?, Forma_pago = ?, Fecha = ?, Hora = ?, Atendio = ?, Observaciones = ? WHERE id_mov = ?',
            [Mat, Concepto, Categoria, Ingreso, Egreso, Forma_pago, Fecha, Hora, Atendio, Observaciones, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Movimiento no encontrado' });
        }

        res.json({ message: 'Movimiento actualizado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el movimiento' });
    }
};

// ✅ Eliminar un movimiento
exports.deleteMovimiento = async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await db.query('DELETE FROM Mov_diario WHERE id_mov = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Movimiento no encontrado' });
        }
        res.json({ message: 'Movimiento eliminado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar el movimiento' });
    }
};
