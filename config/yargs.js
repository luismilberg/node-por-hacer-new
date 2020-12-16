const descripcion = {
    alias: 'd',
    demand: true,
    desc: 'Descripción de la tarea por hacer'
}

const completado = {
    alias: 'c',
    default: true,
    desc: 'Marca como completado o pendiente la tarea'
}

const estado = {
    alias: 'e',
    default: 'all'

}

const argv = require('yargs')
    .command('crear','Crear un elemento por hacer',{
        descripcion 
    })
    .command('actualizar','Actualiza el estado de una tarea por hacer', {
        descripcion,
        completado
    })
    .command('listar','Devuelve un listado de las tareas por hacer', {
        estado
    })
    .command('borrar','Borrar un elemento por hacer',{
        descripcion
    })
    .help()
    .argv;

module.exports = {
    argv
}