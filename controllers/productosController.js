const db = require('../config/db');

// ✅ Obtener todos los productos
exports.getAllProductos = async (req, res) => {
    try {
        const [results] = await db.query('SELECT * FROM Productos');
        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
};

// ✅ Obtener un producto por Clave
exports.getProductoByClave = async (req, res) => {
    const { clave } = req.params;
    try {
        const [results] = await db.query('SELECT * FROM Productos WHERE ClaveP = ?', [clave]);
        if (results.length === 0) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.json(results[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el producto' });
    }
};

// ✅ Crear un nuevo producto
exports.createProducto = async (req, res) => {
    const { ClaveP, NombreP, DescripcionP, CantidadP, CostoP, PrecioP, CostoDev } = req.body;

    try {
        const [result] = await db.query(
            'INSERT INTO Productos (ClaveP, NombreP, DescripcionP, CantidadP, CostoP, PrecioP, CostoDev) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [ClaveP, NombreP, DescripcionP, CantidadP, CostoP, PrecioP, CostoDev]
        );
        res.status(201).json({ message: 'Producto creado', clave: ClaveP });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear el producto' });
    }
};

// ✅ Actualizar un producto
exports.updateProducto = async (req, res) => {
    const { clave } = req.params;
    const { NombreP, DescripcionP, CantidadP, CostoP, PrecioP, CostoDev } = req.body;

    try {
        const [result] = await db.query(
            'UPDATE Productos SET NombreP = ?, DescripcionP = ?, CantidadP = ?, CostoP = ?, PrecioP = ?, CostoDev = ? WHERE ClaveP = ?',
            [NombreP, DescripcionP, CantidadP, CostoP, PrecioP, CostoDev, clave]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        res.json({ message: 'Producto actualizado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el producto' });
    }
};

// ✅ Eliminar un producto
exports.deleteProducto = async (req, res) => {
    const { clave } = req.params;

    try {
        const [result] = await db.query('DELETE FROM Productos WHERE ClaveP = ?', [clave]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.json({ message: 'Producto eliminado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar el producto' });
    }
};
