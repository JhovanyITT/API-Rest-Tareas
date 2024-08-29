// /src/server.js
const express = require('express'); // Framework para construir aplicaciones web y APIs
const cors = require('cors'); // Middleware para permitir solicitudes de recursos cruzados
const morgan = require('morgan'); // Middleware para el registro de solicitudes HTTP

// Importamos las rutas
const tareasRoutes = require('./routes/tareas.route'); // Rutas relacionadas con la entidad tarea

// Creamos una instancia de la aplicación Express
const app = express();
// Middleware para parsear solicitudes JSON
app.use(express.json());
// Middleware para permitir solicitudes de recursos cruzados
app.use(cors());
// Middleware para registrar solicitudes HTTP
app.use(morgan('dev'));
// Usamos las rutas importadas
app.use('/api/tareas', tareasRoutes);
// Middleware para manejar rutas no encontradas
app.use((req, res, next) => {
    res.status(404).json({ message: 'Ruta no encontrada' });
});
// Middleware para manejo de errores generales
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Error interno del servidor' });
});

// Definimos el puerto en el que la aplicación escuchará las solicitudes
const PORT = 3000;
// Iniciamos el servidor y lo ponemos a escuchar en el puerto definido
app.listen(PORT, () => {
    console.log(`Escuchando en el puerto: ${PORT}`);
});