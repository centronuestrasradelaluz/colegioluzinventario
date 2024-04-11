import { Modelo } from "../models/modelo.js";
import { VistaInicioProfesionales } from "../views/profesionales/vistainicio.js";
import { VistaMenuProfesionales } from "../views/profesionales/vistamenu.js";
import { Rest } from "../services/rest.js";

/**
 * Controlador del panel de profesionales.
 */
class ControladorProfesionales {
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

        // Comprobar rol de usuario profesionales
        if (this.#usuario.rol != 'pro')
            window.location.href = 'login.html';

        Rest.setAutorizacion(this.#usuario.autorizacion);
        

        this.modelo = new Modelo();
        this.vistaInicio = new VistaInicioProfesionales(this, document.getElementById('inicioProfesionales'));
        this.obtenerDesplegables()
        this.vistaMenu = new VistaMenuProfesionales(this, document.getElementById('menu'));
        
        this.verVistaInicio();
       
        this.vistaMenu.bienvenida(this.#usuario)
    }


    /**
     * Cambia a la vista de inicio.
     */
    verVistaInicio() {
        this.vistaInicio.mostrarFlex(true);
        
    }

    ingresarMantenimientos(datos) {
    
        //const datos = this.vistaInicio.formulario.obtenerDatos();
        datos.nombreCreador = this.#usuario.nombre
          // Enviar los datos al método correspondiente en el modelo
          console.log(datos)
          this.modelo.ingresarMantenimiento(datos)
          .then(() => {
              // Actualizar la vista después de ingresar el mantenimiento
              this.dameMantenimientos();
              this.vistaInicio.limpiarCampos();
          })
          .catch(error => {
              console.error(error);
          });
     }

      /**
     * Devuelve array de Lineas a vista de gestión de hijos.
     */
      obtenerDesplegables() {
        this.modelo.obtenerDesplegables()
        .then(resultados => {
            this.vistaInicio.rellenarSelects(resultados);
        })
        .catch(error => {
            console.error(error);
        });
    }

     dameMantenimientos(){
        const nombreCreador = this.#usuario.nombre
        this.modelo.dameMantenimientosUsuario(nombreCreador)
        .then(mantenimientos => {
            this.vistaInicio.cargarListado(mantenimientos);
        })
        .catch(e => {
            console.error(e)
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

new ControladorProfesionales();