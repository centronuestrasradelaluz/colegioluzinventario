/**
 * Contiene la vista del menú de padres.
 */
export class VistaMenuProfesionales {
    constructor(controlador, nav) {
        this.controlador = controlador;
        this.nav = nav;
        
        this.liCerrarSesion = this.nav.getElementsByTagName('li')[0];
        this.liCerrarSesion.onclick = this.cerrarSesion.bind(this);
        this.divBienvenida = this.nav.getElementsByTagName('div')[0];
    }

    /**
     * Atención al evento de mostrar vista inicio.
     */
    inicio() {
        this.controlador.verVistaInicio();
    }

    bienvenida(datos){
        this.divBienvenida.textContent = "Bienvenido/a " + datos.nombre
        
    }

    /**
     * Atención al evento de cerrar sesión.
     */
    cerrarSesion() {
        this.controlador.cerrarSesion();
    }
}