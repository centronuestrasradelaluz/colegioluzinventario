/**
 * Contiene la vista del menú de padres.
 */
export class VistaMenuProfesionales {
    constructor(controlador, nav) {
        this.controlador = controlador;
        this.nav = nav;
        
        this.liCerrarSesion = this.nav.getElementsByTagName('li')[0];
        this.liCerrarSesion.onclick = this.cerrarSesion.bind(this);
    }

    /**
     * Atención al evento de mostrar vista inicio.
     */
    inicio() {
        this.controlador.verVistaInicio();
    }

    /**
     * Atención al evento de cerrar sesión.
     */
    cerrarSesion() {
        this.controlador.cerrarSesion();
    }
}