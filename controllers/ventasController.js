const db = require('../config/db');

// ✅ Obtener todas las ventas
exports.getAllVentas = async (req, res) => {
    try {
        const [results] = await db.query('SELECT * FROM Ventas');
        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener las ventas' });
    }
};

// ✅ Obtener una venta por Folio (en lugar de ID)
exports.getVentaByFolio = async (req, res) => {
    const { folio } = req.params;
    try {
        const [results] = await db.query('SELECT * FROM Ventas WHERE Folio = ?', [folio]);
        if (results.length === 0) {
            return res.status(404).json({ error: 'Venta no encontrada' });
        }
        res.json(results[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener la venta' });
    }
};

// ✅ Crear una nueva venta
exports.createVenta = async (req, res) => {
    const { ClaveProdV, MatriculaV, FechaVentaV, HoraVentaV, NombreProdV, DescripcionV, CantidadV, PrecioV, ImporteV, ComentarioV, Nombre_VendV, Fecha_HoraV, Folio, Entregado, CostoV } = req.body;

    try {
        const [result] = await db.query(
            'INSERT INTO Ventas (ClaveProdV, MatriculaV, FechaVentaV, HoraVentaV, NombreProdV, DescripcionV, CantidadV, PrecioV, ImporteV, ComentarioV, Nombre_VendV, Fecha_HoraV, Folio, Entregado, CostoV) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [ClaveProdV, MatriculaV, FechaVentaV, HoraVentaV, NombreProdV, DescripcionV, CantidadV, PrecioV, ImporteV, ComentarioV, Nombre_VendV, Fecha_HoraV, Folio, Entregado, CostoV]
        );
        res.status(201).json({ message: 'Venta registrada', folio: Folio });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al registrar la venta' });
    }
};

// ✅ Actualizar una venta por Folio
exports.updateVenta = async (req, res) => {
    const { folio } = req.params;
    const { ClaveProdV, MatriculaV, FechaVentaV, HoraVentaV, NombreProdV, DescripcionV, CantidadV, PrecioV, ImporteV, ComentarioV, Nombre_VendV, Fecha_HoraV, Entregado, CostoV } = req.body;

    try {
        const [result] = await db.query(
            'UPDATE Ventas SET ClaveProdV = ?, MatriculaV = ?, FechaVentaV = ?, HoraVentaV = ?, NombreProdV = ?, DescripcionV = ?, CantidadV = ?, PrecioV = ?, ImporteV = ?, ComentarioV = ?, Nombre_VendV = ?, Fecha_HoraV = ?, Entregado = ?, CostoV = ? WHERE Folio = ?',
            [ClaveProdV, MatriculaV, FechaVentaV, HoraVentaV, NombreProdV, DescripcionV, CantidadV, PrecioV, ImporteV, ComentarioV, Nombre_VendV, Fecha_HoraV, Entregado, CostoV, folio]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Venta no encontrada' });
        }

        res.json({ message: 'Venta actualizada exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar la venta' });
    }
};

// ✅ Eliminar una venta por Folio
exports.deleteVenta = async (req, res) => {
    const { folio } = req.params;

    try {
        const [result] = await db.query('DELETE FROM Ventas WHERE Folio = ?', [folio]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Venta no encontrada' });
        }
        res.json({ message: 'Venta eliminada' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar la venta' });
    }
};
