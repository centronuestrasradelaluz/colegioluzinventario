/**
 * Contiene la vista del menú de administradores.
 */
export class VistaMenu {
    constructor(controlador, nav) {
        this.controlador = controlador;
        this.nav = nav;

    
        this.liInicio = this.nav.getElementsByTagName('li')[0];
        this.liGestionUsuarios = this.nav.getElementsByTagName('li')[1];
        this.liGestionInventario = this.nav.getElementsByTagName('li')[2];
        this.liGestionMantenimiento = this.nav.getElementsByTagName('li')[3];
        this.liCerrarSesion = this.nav.getElementsByTagName('li')[4];


        this.liInicio.onclick = this.inicio.bind(this);
        this.liCerrarSesion.onclick = this.cerrarSesion.bind(this);
        this.liGestionUsuarios.onclick = this.gestionUsuarios.bind(this)
        this.liGestionInventario.onclick = this.gestionInventario.bind(this);
        this.liGestionMantenimiento.onclick = this.gestionMantenimiento.bind(this);
    }


    inicio() {
        this.controlador.verVistaInicio();

        this.liInicio.classList.add('active');
        this.liGestionInventario.classList.remove('active');
        this.liGestionUsuarios.classList.remove('active');
        this.liGestionMantenimiento.classList.remove('active');
    }

    gestionUsuarios() {
        this.controlador.verVistaGestionUsuarios();

        this.liInicio.classList.remove('active');
        this.liGestionInventario.classList.remove('active');
        this.liGestionUsuarios.classList.add('active');
        this.liGestionMantenimiento.classList.remove('active');
    }

    gestionInventario() {
        this.controlador.verVistaGestionInventario();

        this.liInicio.classList.remove('active');
        this.liGestionInventario.classList.add('active');
        this.liGestionUsuarios.classList.remove('active');
        this.liGestionMantenimiento.classList.remove('active');
    }

    gestionMantenimiento() {
        this.controlador.verVistaGestionMantenimiento();

        this.liInicio.classList.remove('active');
        this.liGestionInventario.classList.remove('active');
        this.liGestionUsuarios.classList.remove('active');
        this.liGestionMantenimiento.classList.add('active');
    }

    /**
     * Atención al evento de cerrar sesión.
     */
    cerrarSesion() {
        this.controlador.cerrarSesion();
    }
}