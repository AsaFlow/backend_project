const db = require('../config/db');

// ✅ Obtener todas las papas
exports.getAllPapas = async (req, res) => {
    try {
        const [results] = await db.query('SELECT * FROM papas');
        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los papas' });
    }
};

// ✅ Obtener un papa por `id_papa`
exports.getPapaById = async (req, res) => {
    const { id_papa } = req.params;
    try {
        const [results] = await db.query('SELECT * FROM papas WHERE id_papa = ?', [id_papa]);
        if (results.length === 0) {
            return res.status(404).json({ error: 'Papa no encontrado' });
        }
        res.json(results[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el papa' });
    }
};

// ✅ Crear un nuevo papa
exports.createPapa = async (req, res) => {
    const {
        matricula, parentesco, nombre, calle, num_ext, num_int, colonia, muni_alcadia, cp,
        ent_federativa, entre_calle_1, entre_calle_2, telefono_1, telefono_2, tel_trabajo,
        correo_1, correo_2, ocupacion, estado_civil, fecha_actualizado, observaciones
    } = req.body;

    try {
        const [result] = await db.query(
            `INSERT INTO papas (matricula, parentesco, nombre, calle, num_ext, num_int, colonia, muni_alcadia, cp,
                ent_federativa, entre_calle_1, entre_calle_2, telefono_1, telefono_2, tel_trabajo,
                correo_1, correo_2, ocupacion, estado_civil, fecha_actualizado, observaciones)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [matricula, parentesco, nombre, calle, num_ext, num_int, colonia, muni_alcadia, cp,
                ent_federativa, entre_calle_1, entre_calle_2, telefono_1, telefono_2, tel_trabajo,
                correo_1, correo_2, ocupacion, estado_civil, fecha_actualizado, observaciones]
        );

        res.status(201).json({ message: 'Papa creado', id_papa: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al registrar el papa' });
    }
};

// ✅ Actualizar un papa por `id_papa`
exports.updatePapa = async (req, res) => {
    const { id_papa } = req.params;
    const {
        matricula, parentesco, nombre, calle, num_ext, num_int, colonia, muni_alcadia, cp,
        ent_federativa, entre_calle_1, entre_calle_2, telefono_1, telefono_2, tel_trabajo,
        correo_1, correo_2, ocupacion, estado_civil, fecha_actualizado, observaciones
    } = req.body;

    try {
        const [result] = await db.query(
            `UPDATE papas SET matricula = ?, parentesco = ?, nombre = ?, calle = ?, num_ext = ?, num_int = ?, colonia = ?, muni_alcadia = ?, cp = ?,
                ent_federativa = ?, entre_calle_1 = ?, entre_calle_2 = ?, telefono_1 = ?, telefono_2 = ?, tel_trabajo = ?,
                correo_1 = ?, correo_2 = ?, ocupacion = ?, estado_civil = ?, fecha_actualizado = ?, observaciones = ?
            WHERE id_papa = ?`,
            [matricula, parentesco, nombre, calle, num_ext, num_int, colonia, muni_alcadia, cp,
                ent_federativa, entre_calle_1, entre_calle_2, telefono_1, telefono_2, tel_trabajo,
                correo_1, correo_2, ocupacion, estado_civil, fecha_actualizado, observaciones, id_papa]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Papa no encontrado' });
        }

        res.json({ message: 'Papa actualizado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el papa' });
    }
};

// ✅ Eliminar un papa por `id_papa`
exports.deletePapa = async (req, res) => {
    const { id_papa } = req.params;

    try {
        const [result] = await db.query('DELETE FROM papas WHERE id_papa = ?', [id_papa]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Papa no encontrado' });
        }
        res.json({ message: 'Papa eliminado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar el papa' });
    }
};
