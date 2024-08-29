// /src/routes/tareas.route.js

// Importar los módulos necesarios
const express = require('express'); // Framework para construir aplicaciones web y APIs
const router = express.Router(); // Módulo de enrutador de Express
const {
    obtenerTareas,
    obtenerTareaPorId,
    agregarTarea,
    actualizarTarea,
    eliminarTarea,
    cantidadTotalDeTareas,
    obtenerTareaMasReciente,
    obtenerTareaMasAntigua,
    contarTareasPorEstado
} = require('../controllers/tarea.controller'); // Importamos las funciones del controlador de alumnos
// Ruta para obtener todas las tareas
router.get('/', obtenerTareas);
// Ruta para obtener una tarea por su ID
router.get('/:id', obtenerTareaPorId);
// Ruta para crear una nueva tarea
router.post('/:id', agregarTarea);
// Ruta para actualizar una tarea por su ID
router.put('/:id', actualizarTarea);
// Ruta para eliminar una tarea por su ID
router.delete('/:id', eliminarTarea);

// Parte de analisis
router.get('/analisis/q1', cantidadTotalDeTareas);
router.get('/analisis/q2', obtenerTareaMasReciente);
router.get('/analisis/q3', obtenerTareaMasAntigua);
router.get('/analisis/q4', contarTareasPorEstado);

module.exports = router;