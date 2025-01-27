const db = require('../config/db');

// ✅ Obtener todos los alumnos
exports.getAllAlumnos = async (req, res) => {
    try {
        const [results] = await db.query('SELECT * FROM alta_alumno');
        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los alumnos' });
    }
};

// ✅ Obtener un alumno por Matrícula
exports.getAlumnoByMatricula = async (req, res) => {
    const { matricula } = req.params;
    try {
        const [results] = await db.query('SELECT * FROM alta_alumno WHERE matricula = ?', [matricula]);
        if (results.length === 0) {
            return res.status(404).json({ error: 'Alumno no encontrado' });
        }
        res.json(results[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el alumno' });
    }
};

// ✅ Crear un nuevo alumno
exports.createAlumno = async (req, res) => {
    const { matricula, uno_apellido, dos_apellido, nombres, sexo, fecha_nac, max_ciclo, max_grado, max_nivel, max_plantel, curp, atendio, comentarios, foto, folio, fecha_sistema, fechaHora_sistema } = req.body;

    try {
        const [result] = await db.query(
            'INSERT INTO alta_alumno (matricula, uno_apellido, dos_apellido, nombres, sexo, fecha_nac, max_ciclo, max_grado, max_nivel, max_plantel, curp, atendio, comentarios, foto, folio, fecha_sistema, fechaHora_sistema) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [matricula, uno_apellido, dos_apellido, nombres, sexo, fecha_nac, max_ciclo, max_grado, max_nivel, max_plantel, curp, atendio, comentarios, foto, folio, fecha_sistema, fechaHora_sistema]
        );
        res.status(201).json({ message: 'Alumno registrado', matricula });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al registrar el alumno' });
    }
};

// ✅ Actualizar datos de un alumno por Matrícula
exports.updateAlumno = async (req, res) => {
    const { matricula } = req.params;
    const { uno_apellido, dos_apellido, nombres, sexo, fecha_nac, max_ciclo, max_grado, max_nivel, max_plantel, curp, atendio, comentarios, foto, folio, fecha_sistema, fechaHora_sistema } = req.body;

    try {
        const [result] = await db.query(
            'UPDATE alta_alumno SET uno_apellido = ?, dos_apellido = ?, nombres = ?, sexo = ?, fecha_nac = ?, max_ciclo = ?, max_grado = ?, max_nivel = ?, max_plantel = ?, curp = ?, atendio = ?, comentarios = ?, foto = ?, folio = ?, fecha_sistema = ?, fechaHora_sistema = ? WHERE matricula = ?',
            [uno_apellido, dos_apellido, nombres, sexo, fecha_nac, max_ciclo, max_grado, max_nivel, max_plantel, curp, atendio, comentarios, foto, folio, fecha_sistema, fechaHora_sistema, matricula]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Alumno no encontrado' });
        }

        res.json({ message: 'Datos del alumno actualizados' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar los datos del alumno' });
    }
};

// ✅ Eliminar un alumno por Matrícula
exports.deleteAlumno = async (req, res) => {
    const { matricula } = req.params;

    try {
        const [result] = await db.query('DELETE FROM alta_alumno WHERE matricula = ?', [matricula]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Alumno no encontrado' });
        }
        res.json({ message: 'Alumno eliminado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar el alumno' });
    }
};
