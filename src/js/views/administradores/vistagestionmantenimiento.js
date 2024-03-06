import { Vista } from '../vista.js';

/**
 * Contiene la vista del inicio
 */
export class VistaGestionMantenimiento extends Vista {
    /**
	 *	Constructor de la clase.
	 *	@param {ControladorAdministradores} controlador Controlador de la vista.
	 *	@param {HTMLDivElement} div Div de HTML en el que se desplegará la vista.
	 */
    constructor(controlador, div) {
        super(controlador, div);

         //Secciones de la Vista

       this.divListado = this.div.querySelector('#divListadoMantenimientos');
       this.divAlta = this.div.querySelector('#divAltaMantenimientos');
       this.divConsulta = this.div.querySelector('#divConsultaMantenimientos');

       //Elementos vista Listado

       this.thead = this.div.getElementsByTagName('thead')[0];
       this.tbody = this.div.getElementsByTagName('tbody')[0];
       this.busqueda = ""
       this.cargarEncabezado();

       //Botones de la vista
       this.botonVolver = this.div.querySelector('#botonVolverMantenimientos');
       this.botonVolver.addEventListener('click', this.volver.bind(this));

       this.botonAnadir = this.div.querySelector('#aceptar')
       this.botonAnadir.addEventListener('click', this.ingresarMantenimiento.bind(this));

       //Formulario de la vista e inputs
       this.formAlta = this.div.getElementsByTagName('form')[0];
       this.inputsAlta = this.formAlta.getElementsByTagName('input');

       this.divExitoAlta = this.div.querySelector('#divExito');
       this.divCargandoAlta = this.div.querySelector('#loadingImg');

       
        //Parametros necesarios para cargar la vista
        
        this.esModificacion = false
        this.controlador.dameMantenimientos("")
        this.mostrarOcultarCrud(true,false,false,false)
        
    }

      
     /**
     * Informar al usuario del alta exitosa.
     * @param {Boolean} activar Activa o no mensaje éxito.
     */
     exitoAlta(activar) {
        

        if(!this.esModificacion){
            this.formAlta.reset();
            this.formAlta.classList.remove('was-validated');
        }
       
        this.divCargandoAlta.style.display = 'none';
        this.divExitoAlta.style.display = activar ? 'block' : 'none';

    }

     //metodo para ocultar el crud de la gestion de hijos

     mostrarOcultarCrud(listado, alta, modificacion,consulta){

    
        if (alta && !modificacion){
            this.esModificacion = false;
        }
        if (alta && modificacion){
            
            this.esModificacion = true;
        }
        if (listado){
            this.esModificacion = false;
        }
        if(consulta){
            this.esModificacion = false
        }

        this.divAlta.style.display = alta ? 'block' : 'none';
        this.divListadoEquipos.style.display = listado ? 'block' : 'none';
        this.divConsultaEquipos.style.display = consulta ? 'block': 'none';
       
        console.log('modificacion global', this.esModificacion)
    }

    mostrar(ver) {
        super.mostrar(ver);
    }
}