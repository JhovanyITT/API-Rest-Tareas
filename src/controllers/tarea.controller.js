// /src/controllers/tarea.controller.js

// Importando la clase tarea
// const Tarea = require("../models/tarea.model");
const Tarea = require("../models/tarea.model");


//Arreglo de tareas simulando una BD
let arregloTareas = [];

const obtenerTareas = async (req, res) => {
    res.json({
        message: 'Tareas obtenidas exitosamente',
        data: arregloTareas
    });
};

const obtenerTareaPorId = async (req, res) => {
    const idTarea = req.params.id;
    const tarea = arregloTareas.find(tarea => tarea.idTarea === idTarea);
    if (!tarea)
        return res.status(404).json({ message: 'Tarea no encontrada' });
    res.json({ message: 'Tarea encontrada exitosamente', tarea });
};

const agregarTarea = async (req, res) => {
    const idTarea = req.params.id;
    const { titulo, cuerpo, completado } = req.body;
    const nuevaTarea = new Tarea(idTarea, titulo, cuerpo, completado);
    arregloTareas.push(nuevaTarea);
    res.status(201).json(nuevaTarea);
};


const actualizarTarea = async (req, res) => {
    const idTarea = req.params.id;
    const { titulo, cuerpo, completado } = req.body;

    const indiceTarea = arregloTareas.findIndex(tarea => tarea.idTarea === idTarea);

    if (indiceTarea === -1) {
        return res.status(404).json({ message: 'Tarea no encontrada' });
    }

    arregloTareas[indiceTarea].titulo = titulo;
    arregloTareas[indiceTarea].cuerpo = cuerpo;
    arregloTareas[indiceTarea].completado = completado;

    res.status(201).json({ message: 'Tarea actualizada exitosamente', Tarea: arregloTareas[indiceTarea] });
};

const eliminarTarea = async (req, res) => {
    const idTarea = req.params.id;
    const indiceTarea = arregloTareas.findIndex(tarea => tarea.idTarea === idTarea);

    if (indiceTarea === -1) {
        return res.status(404).json({ message: 'Tarea no encontrada' });
    }

    arregloTareas.splice(indiceTarea, 1);

    res.status(201).json({ message: 'Tarea eliminada exitosamente' });
};


// Parte de analisis
const cantidadTotalDeTareas = async (req, res) => {
    res.json({
        message: 'Tareas contadas exitosamente',
        data: arregloTareas.length
    });
};

const obtenerTareaMasReciente = (req, res) => {
    if (arregloTareas.length === 0) {
        return res.status(404).json({ message: 'La lista de tareas está vacia' });
    }

    res.json({
        message: 'Mostrando la tarea más reciente',
        data: arregloTareas.reduce((tareaMasReciente, tareaActual) => {
            return tareaActual.fechaTarea > tareaMasReciente.fechaTarea ? tareaActual : tareaMasReciente;
        })
    });
};

const obtenerTareaMasAntigua = (req, res) => {
    if (arregloTareas.length === 0) {
        return res.status(404).json({ message: 'La lista de tareas está vacia' });
    }

    res.json({
        message: 'Mostrando la tarea más antigua',
        data: arregloTareas.reduce((tareaMasAntigua, tareaActual) => {
            return tareaActual.fechaTarea < tareaMasAntigua.fechaTarea ? tareaActual : tareaMasAntigua;
        })
    });
};

const contarTareasPorEstado = (req, res) => {
    if (arregloTareas.length === 0) {
        return res.status(404).json({ message: 'La lista de tareas está vacia' });
    }
    
    let completadas = 0;
    let noCompletadas = 0;

    arregloTareas.forEach(tarea => {
        if (tarea.completado) {
            completadas++;
        } else {
            noCompletadas++;
        }
    });

    res.json({
        message: 'Tareas contadas exitosamente',
        data: `Tareas completadas: ${completadas} - Tareas no completadas ${noCompletadas}`
    });
};


// Exportamos las funciones del controlador
module.exports = {
    obtenerTareas,
    obtenerTareaPorId,
    agregarTarea,
    actualizarTarea,
    eliminarTarea,
    cantidadTotalDeTareas,
    obtenerTareaMasReciente,
    obtenerTareaMasAntigua,
    contarTareasPorEstado
};