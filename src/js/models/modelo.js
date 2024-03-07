import { Rest } from "../services/rest.js";

/**
 * Modelo de la aplicación.
 * Se responsabiliza del mantenimiento y gestión de los datos.
 * Utiliza el Servicio de Rest.
 */
export class Modelo {

    /**
     * Realiza el proceso de obtener todas las filas de la tabla curso.
     * @returns {Promise} Devuelve la promesa asociada a la petición.
     */
    dameUsuarios(texto) {
        return Rest.get('usuarios', [texto], []);
    }

    ingresarUsuarios(datos) {
       
        return Rest.post('usuarios', [], datos, false);
    }

    eliminarUsuario(id) {
        
        return Rest.delete('usuarios', [id]);
    }

    modificarUsuarios(datos) {

        return Rest.put('usuarios', [], datos, false);
    }
    
                            ///////INVENTARIO///////
    dameEquipos(texto){
        return Rest.get('inventario', [texto], []);
    }

    ingresarEquipos(datos) {

        console.log(datos)
       
        return Rest.post('inventario', [], datos, false);
    }

    eliminarEquipo(id) {
        
        return Rest.delete('inventario', [id]);
    }

    modificarEquipos(datos) {

        return Rest.put('inventario', [], datos, false);
    }

    obtenerDesplegables(pantalla){
        const queryParams = new Map();
        queryParams.set('pantalla', pantalla);
        return Rest.get('seleccionados', [], queryParams);
        //return Rest.get('seleccionados',[], [] )
    }

    dameMantenimientos(texto){
        return Rest.get('mantenimiento', [texto], []);
    }






   

}