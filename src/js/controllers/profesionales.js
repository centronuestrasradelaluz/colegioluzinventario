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
        this.vistaInicio = new VistaInicioProfesionales(this, document.getElementById('inicioPadres'));
        this.vistaMenu = new VistaMenuProfesionales(this, document.getElementById('menuPadres'));
        
        this.verVistaInicio();
    }


    /**
     * Cambia a la vista de inicio.
     */
    verVistaInicio() {
        this.vistaInicio.mostrar(true);
        
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