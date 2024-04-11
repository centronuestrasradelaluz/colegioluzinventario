import { Modelo } from "../models/modelo.js";
import { VistaInicio } from "../views/administradores/vistainicio.js";
import { VistaMenu } from "../views/administradores/vistamenu.js";
import { VistaGestionUsuarios } from "../views/administradores/vistagestionusuarios.js";
import { Rest } from "../services/rest.js";
import { VistaGestionInventario } from "../views/administradores/vistagestioninventario.js";
import { VistaGestionMantenimiento } from "../views/administradores/vistagestionmantenimiento.js";

/**
 * Controlador del panel de administradores.
 */
class ControladorAdministradores {
    #usuario = null; // Usuario logueado.

    constructor() {
        window.onload = this.iniciar.bind(this);
        window.onerror = (error) => console.error('Error capturado. ' + error);
    }
    /**
     * Inicia la aplicación.
     */
    iniciar() {
        this.#usuario = JSON.parse(sessionStorage.getItem('usuario'));
        // Comprobar login
        if (!this.#usuario)
            window.location.href = 'login.html';

        // Comprobar rol de usuario administrador
        if (this.#usuario.rol != 'adm')
            window.location.href = 'login.html';

        // Se genera la autorizacion para usar el servicio rest
        Rest.setAutorizacion(this.#usuario.autorizacion);

        // Se crea el objeto del Modelo
        this.modelo = new Modelo();
        
        // Se administraran las vistas de los administradores
        this.vistaInicio = new VistaInicio(this, document.getElementById('inicioAdministradores'));
        this.vistaMenu = new VistaMenu(this, document.getElementById('menu'));
        this.vistaGestionUsuarios = new VistaGestionUsuarios(this, document.getElementById('gestionUsuarios'))
        this.vistaGestionInventario = new VistaGestionInventario(this, document.getElementById('gestionInventario'))
        this.vistaGestionMantenimiento = new VistaGestionMantenimiento(this, document.getElementById('gestionMantenimiento'))
       
        //Vista pedreterminada al iniciar la app
        this.verVistaInicio();
        
        //Lleno desplegables

        this.obtenerDesplegables()

        //Cargamos el divBienvenida con el nombre del usuario logueado
        this.vistaMenu.bienvenida(this.#usuario)
        
    }
    /**
     * Cambia a la vista de inicio.
     */
    verVistaInicio() {
        this.vistaInicio.mostrar(true);
        this.vistaGestionUsuarios.mostrar(false);
        this.vistaGestionMantenimiento.mostrar(false);
        this.vistaGestionInventario.mostrar(false);
        
    }
    /**
     * Cambia a la vista de usuarios.
     */
    verVistaGestionUsuarios() {
        this.vistaInicio.mostrar(false);
        this.vistaGestionUsuarios.mostrar(true);
        this.vistaGestionMantenimiento.mostrar(false);
        this.vistaGestionInventario.mostrar(false);
       
    }
    /**
     * Cambia a la vista de inventario
     */
    verVistaGestionInventario() {
        this.vistaInicio.mostrar(false);
        this.vistaGestionUsuarios.mostrar(false);
        this.vistaGestionMantenimiento.mostrar(false);
        this.vistaGestionInventario.mostrar(true);
        
    }
    /**
     * Cambia a la vista de mantenimiento
     */
    verVistaGestionMantenimiento() {
        this.vistaInicio.mostrar(false);
        this.vistaGestionUsuarios.mostrar(false);
        this.vistaGestionMantenimiento.mostrar(true);
        this.vistaGestionInventario.mostrar(false);
       
    }
    /**
     * Devuelve Objeto cargado con Arrays de los diferentes desplegables.
     */
    obtenerDesplegables() {
        this.modelo.obtenerDesplegables()
        .then(resultados => {
            this.vistaGestionInventario.rellenarSelects(resultados);
            this.vistaGestionMantenimiento.rellenarSelects(resultados);

        })
        .catch(error => {
            console.error(error);
        });
    }
     /**
     * Devuelve los usuarios registrados a la gestión de usuarios.
     */
    dameUsuarios(texto) {
        this.modelo.dameUsuarios(texto)
            .then(usuarios => {
                this.vistaGestionUsuarios.cargarListado(usuarios);
            })
            .catch(e => {
                console.error(e)
            })
    }
     /**
     * Elimina un usuario .
     */
    eliminarUsuario(id) {
        this.modelo.eliminarUsuario(id)
        .then(() =>{
            this.dameUsuarios();
        })
        .catch(e => {
            console.error(e)
        })
    }
     /**
     * Ingresa usuarios a la base de datos.
     */
    ingresarUsuarios(datos) {
        this.modelo.ingresarUsuarios(datos)
         .then(() => {
            // this.vistaGestionHijos.bloquearBotonesAlta(false);
             this.vistaGestionUsuarios.exitoAlta(true);
             this.dameUsuarios(); // Actualizar lista de usuarios
         })
         .catch(e => {
             //this.vistaGestionHijos.bloquearBotonesAlta(false);
             console.error(e);
         })
    }
     /**
     * Modifica los registros de usuarios.
     */
    modificarUsuarios(datos) {
        this.modelo.modificarUsuarios(datos)
        .then(() => {
              // this.vistaGestionHijos.bloquearBotonesAlta(false);
            this.vistaGestionUsuarios.exitoAlta(true);
            this.dameUsuarios();// Actualizar lista de usuarios
        })
        .catch(e => {
            //this.vistaGestionHijos.bloquearBotonesAlta(false);
            console.error(e);
        })
    }
    
                                        ////////////INVENTARIO///////////////
     /**
     * Devuelve los equipos de la consulta
     */
    dameEquipos(texto){
        this.modelo.dameEquipos(texto)
        .then(equipos => {
            this.vistaGestionInventario.cargarListado(equipos);
        })
        .catch(e => {
            console.error(e)
        })
    }

    //COMENTADO POR EL MOMENTO
    
    /*eliminarEquipo(id) {
        this.modelo.eliminarEquipo(id)
        .then(() =>{
            this.dameEquipos();
        })
        .catch(e => {
            console.error(e)
        })
    }*/

    ingresarEquipos(datos) {
        this.modelo.ingresarEquipos(datos)
         .then(() => {
            // this.vistaGestionHijos.bloquearBotonesAlta(false);
             this.vistaGestionInventario.exitoAlta(true);
             this.dameEquipos(); // Actualizar lista de usuarios
         })
         .catch(e => {
             //this.vistaGestionHijos.bloquearBotonesAlta(false);
             console.error(e);
         })
    }

    modificarEquipos(datos) {
        this.modelo.modificarEquipos(datos)
        .then(() => {
              // this.vistaGestionHijos.bloquearBotonesAlta(false);
            this.vistaGestionInventario.exitoAlta(true);
            this.dameEquipos();// Actualizar lista de usuarios
        })
        .catch(e => {
            //this.vistaGestionHijos.bloquearBotonesAlta(false);
            console.error(e);
        })
    }

    //MANTENIMIENTOOOOOOOOOOOOOOOOOo

    dameMantenimientos(texto){
        this.modelo.dameMantenimientos(texto)
        .then(mantenimientos => {
            this.vistaGestionMantenimiento.cargarListado(mantenimientos);
        })
        .catch(e => {
            console.error(e)
        })
    }

    ingresarMantenimientos(datos) {
       datos.nombreCreador = this.#usuario.nombre
       
        this.modelo.ingresarMantenimiento(datos)
         .then(() => {
            // this.vistaGestionHijos.bloquearBotonesAlta(false);
             this.vistaGestionMantenimiento.exitoAlta(true);
             this.dameMantenimientos(); // Actualizar lista de usuarios
         })
         .catch(e => {
             //this.vistaGestionHijos.bloquearBotonesAlta(false);
             console.error(e);
         })
    }


    eliminarMantenimiento(id){
        this.modelo.eliminarMantenimiento(id)
        .then(() =>{
            this.dameMantenimientos();
        })
        .catch(e => {
            console.error(e)
        })
    }

    modificarMantenimiento(datos){
        this.modelo.modificarMantenimiento(datos)
        .then(() => {
              // this.vistaGestionHijos.bloquearBotonesAlta(false);
            this.vistaGestionMantenimiento.exitoAlta(true);
            this.dameMantenimientos();// Actualizar lista de mantenimientos
        })
        .catch(e => {
            //this.vistaGestionHijos.bloquearBotonesAlta(false);
            console.error(e);
        })
    }





    /**
     * Cierra la sesión del usuario.
     */
    cerrarSesion() {
        this.#usuario = null;
        sessionStorage.removeItem('usuario');
        Rest.setAutorizacion(null);
        window.location.href = 'login.html';
    }

}

new ControladorAdministradores();