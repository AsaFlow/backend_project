const db = require('../config/db');

// ✅ Obtener todos los usuarios
exports.getAllUsuarios = async (req, res) => {
    try {
        const [results] = await db.query('SELECT * FROM usuarios');
        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
};

// ✅ Obtener un usuario por `ID_Usuario`
exports.getUsuarioById = async (req, res) => {
    const { ID_Usuario } = req.params;
    try {
        const [results] = await db.query('SELECT * FROM usuarios WHERE ID_Usuario = ?', [ID_Usuario]);
        if (results.length === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.json(results[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el usuario' });
    }
};

// ✅ Crear un nuevo usuario
exports.createUsuario = async (req, res) => {
    const {
        Nombre_Usuario, Usuario, Pass, Administrador, EditorLim, Inscripciones, Papas, Alimento,
        Mensualidades, Asignaciones, Alumno, Ventas, Incidencias, Asistencia, Mostrar_Cinta_Opciones,
        Activar_Shift, CMRP, CSP, Preescolar, Admin1
    } = req.body;

    try {
        const [result] = await db.query(
            `INSERT INTO usuarios 
            (Nombre_Usuario, Usuario, Pass, Administrador, EditorLim, Inscripciones, Papas, Alimento,
             Mensualidades, Asignaciones, Alumno, Ventas, Incidencias, Asistencia, Mostrar_Cinta_Opciones,
             Activar_Shift, CMRP, CSP, Preescolar, Admin1)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                Nombre_Usuario, Usuario, Pass, Administrador, EditorLim, Inscripciones, Papas, Alimento,
                Mensualidades, Asignaciones, Alumno, Ventas, Incidencias, Asistencia, Mostrar_Cinta_Opciones,
                Activar_Shift, CMRP, CSP, Preescolar, Admin1
            ]
        );

        res.status(201).json({ message: 'Usuario creado', ID_Usuario: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear el usuario' });
    }
};

// ✅ Actualizar un usuario por `ID_Usuario`
exports.updateUsuario = async (req, res) => {
    const { ID_Usuario } = req.params;
    const {
        Nombre_Usuario, Usuario, Pass, Administrador, EditorLim, Inscripciones, Papas, Alimento,
        Mensualidades, Asignaciones, Alumno, Ventas, Incidencias, Asistencia, Mostrar_Cinta_Opciones,
        Activar_Shift, CMRP, CSP, Preescolar, Admin1
    } = req.body;

    try {
        const [result] = await db.query(
            `UPDATE usuarios SET 
            Nombre_Usuario = ?, Usuario = ?, Pass = ?, Administrador = ?, EditorLim = ?, Inscripciones = ?, 
            Papas = ?, Alimento = ?, Mensualidades = ?, Asignaciones = ?, Alumno = ?, Ventas = ?, 
            Incidencias = ?, Asistencia = ?, Mostrar_Cinta_Opciones = ?, Activar_Shift = ?, CMRP = ?, 
            CSP = ?, Preescolar = ?, Admin1 = ?
            WHERE ID_Usuario = ?`,
            [
                Nombre_Usuario, Usuario, Pass, Administrador, EditorLim, Inscripciones, Papas, Alimento,
                Mensualidades, Asignaciones, Alumno, Ventas, Incidencias, Asistencia, Mostrar_Cinta_Opciones,
                Activar_Shift, CMRP, CSP, Preescolar, Admin1, ID_Usuario
            ]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        res.json({ message: 'Usuario actualizado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el usuario' });
    }
};

// ✅ Eliminar un usuario por `ID_Usuario`
exports.deleteUsuario = async (req, res) => {
    const { ID_Usuario } = req.params;

    try {
        const [result] = await db.query('DELETE FROM usuarios WHERE ID_Usuario = ?', [ID_Usuario]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.json({ message: 'Usuario eliminado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar el usuario' });
    }
};
