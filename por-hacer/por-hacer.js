const fs = require('fs');

let listadoPorHacer = [];

const guardarDB = () => {
        
    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile('./db/data.json', data, (err) => {
        
        if(err) throw new Error('No se pudo guardar el archivo', err);

    })

}

const cargarDB = () => {

    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }


}

const crear = (descripcion) => {

    cargarDB();

    let porHacer = {
        descripcion,
        completado: false
    };

    listadoPorHacer.push(porHacer);

    guardarDB();

    return porHacer;
}

const getListado = ()=>{
    
    cargarDB();

    return listadoPorHacer;
}

const actualizar = (descripcion, completado = true) => {

    cargarDB();

    let index = listadoPorHacer.findIndex( tarea => tarea.descripcion === descripcion);

    if(index >= 0){
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }

}

const borrar = (descripcion) => {

    cargarDB();

    let index = listadoPorHacer.indexOf(tarea => tarea.descripcion === descripcion);

    if(index >= 0){

        listadoPorHacer = listadoPorHacer.filter(tarea => tarea.descripcion !== descripcion);
        guardarDB();
        return true;
        
    } else {
        return false;
    }

}


const listar = (estado) => {
    
    let listado = getListado();
    switch (estado) {
        case 'all':
            imprimirListado(listado);
            break;
        case 'true':
            listado = listado.filter(tarea => tarea.completado === true);
            imprimirListado(listado);
            break;
        case 'false':
            listado = listado.filter(tarea => tarea.completado === false);
            imprimirListado(listado);
            break;
    
        default:
            console.log('Opcion no válida');
            break;
    }

    
        

}

const imprimirListado = (listado) => {
    if(listado.length === 0){
        console.log('No existen tareas pendientes!'.green);
    } else {
        for(let tarea of listado){
            
            let estadoTarea = tarea.completado?'Completado'.green:'Pendiente'.red;

            console.log('===== Por Hacer ====='.green);
            console.log(tarea.descripcion);
            console.log('Estado: ', estadoTarea)
            console.log('====================='.green);
        }
    }
}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar,
    listar
}