class Tarea {
    idTarea = "";
    titulo = "";
    cuerpo = "";
    fechaTarea = new Date();
    completado = false;

    constructor(idTarea, titulo, cuerpo, completado) {
        this.idTarea = idTarea;
        this.titulo = titulo;
        this.cuerpo = cuerpo;
        this.completado = completado;
    }
}

module.exports = Tarea;