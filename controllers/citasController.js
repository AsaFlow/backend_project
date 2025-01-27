const db = require('../config/db');

// ✅ Obtener todas las citas
exports.getAllCitas = async (req, res) => {
    try {
        const [results] = await db.query('SELECT * FROM citas');
        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener las citas' });
    }
};

// ✅ Obtener una cita por `IdCita`
exports.getCitaById = async (req, res) => {
    const { IdCita } = req.params;
    try {
        const [results] = await db.query('SELECT * FROM citas WHERE IdCita = ?', [IdCita]);
        if (results.length === 0) {
            return res.status(404).json({ error: 'Cita no encontrada' });
        }
        res.json(results[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener la cita' });
    }
};

// ✅ Crear una nueva cita
exports.createCita = async (req, res) => {
    const { Matricula, NombreAlumno, Asunto, Grupo, Colegio, NombrePadre, parentesco, via, Atendera, FechaSug, HoraSug, FechaC, HoraC, Confirmacion, Aviso, Fecha_HoraC, ComentarioInterno, Fecha_sis, Hora_sist, atendio, Fecha_HoraAviso, IncideRel } = req.body;

    try {
        const [result] = await db.query(
            `INSERT INTO citas (Matricula, NombreAlumno, Asunto, Grupo, Colegio, NombrePadre, parentesco, via, Atendera, FechaSug, HoraSug, FechaC, HoraC, Confirmacion, Aviso, Fecha_HoraC, ComentarioInterno, Fecha_sis, Hora_sist, atendio, Fecha_HoraAviso, IncideRel)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [Matricula, NombreAlumno, Asunto, Grupo, Colegio, NombrePadre, parentesco, via, Atendera, FechaSug, HoraSug, FechaC, HoraC, Confirmacion, Aviso, Fecha_HoraC, ComentarioInterno, Fecha_sis, Hora_sist, atendio, Fecha_HoraAviso, IncideRel]
        );

        res.status(201).json({ message: 'Cita creada', IdCita: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al registrar la cita' });
    }
};

// ✅ Actualizar una cita por `IdCita`
exports.updateCita = async (req, res) => {
    const { IdCita } = req.params;
    const { Matricula, NombreAlumno, Asunto, Grupo, Colegio, NombrePadre, parentesco, via, Atendera, FechaSug, HoraSug, FechaC, HoraC, Confirmacion, Aviso, Fecha_HoraC, ComentarioInterno, Fecha_sis, Hora_sist, atendio, Fecha_HoraAviso, IncideRel } = req.body;

    try {
        const [result] = await db.query(
            `UPDATE citas SET Matricula = ?, NombreAlumno = ?, Asunto = ?, Grupo = ?, Colegio = ?, NombrePadre = ?, parentesco = ?, via = ?, Atendera = ?, FechaSug = ?, HoraSug = ?, FechaC = ?, HoraC = ?, Confirmacion = ?, Aviso = ?, Fecha_HoraC = ?, ComentarioInterno = ?, Fecha_sis = ?, Hora_sist = ?, atendio = ?, Fecha_HoraAviso = ?, IncideRel = ?
            WHERE IdCita = ?`,
            [Matricula, NombreAlumno, Asunto, Grupo, Colegio, NombrePadre, parentesco, via, Atendera, FechaSug, HoraSug, FechaC, HoraC, Confirmacion, Aviso, Fecha_HoraC, ComentarioInterno, Fecha_sis, Hora_sist, atendio, Fecha_HoraAviso, IncideRel, IdCita]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Cita no encontrada' });
        }

        res.json({ message: 'Cita actualizada' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar la cita' });
    }
};

// ✅ Eliminar una cita por `IdCita`
exports.deleteCita = async (req, res) => {
    const { IdCita } = req.params;

    try {
        const [result] = await db.query('DELETE FROM citas WHERE IdCita = ?', [IdCita]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Cita no encontrada' });
        }
        res.json({ message: 'Cita eliminada' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar la cita' });
    }
};
