import { Vista } from '../vista.js';

/**
 * Contiene la vista del inicio
 */
export class VistaInicioProfesionales extends Vista {
    /**
	 *	Constructor de la clase.
	 *	@param {ControladorProfesionales} controlador Controlador de la vista.
	 *	@param {HTMLDivElement} div Div de HTML en el que se desplegará la vista.
	 */
    constructor(controlador, div) {
        super(controlador, div);

        this.divListado = this.div.querySelector('#divListadoMantenimientosPro');
       this.divAlta = this.div.querySelector('#divAltaMantenimientosPro');


       this.thead = this.div.getElementsByTagName('thead')[0];
       this.tbody = this.div.getElementsByTagName('tbody')[0];
       this.cargarEncabezado();

       //Formulario de la vista e inputs
       this.formAlta = this.div.getElementsByTagName('form')[0];
       this.divFormularios = this.div.getElementsByClassName("formItem")

       this.inputsAlta = this.formAlta.getElementsByTagName('input');
       this.selectsAlta = this.formAlta.getElementsByTagName('select');

       this.selectCodigoEquipo = this.div.querySelector("#selectCodigoEquipo")

       this.divExitoAlta = this.div.querySelector('#divExito');
       this.divCargandoAlta = this.div.querySelector('#loadingImg');

       this.botonAnadir = this.div.querySelector('#aceptar')
       this.botonAnadir.addEventListener('click', this.ingresarMantenimientos.bind(this));

       
        //Parametros necesarios para cargar la vista

        this.idMantenimiento = 0
      
        this.esModificacion = false
        this.divFormularios[1].style.display = 'none'
        this.controlador.dameMantenimientos("")

    }

    rellenarSelects(resultados) {
        this.llenarSelect(resultados["codigoEquipo"], this.selectCodigoEquipo, "Elija Codigo de Equipo");
    }
    
    llenarSelect(items, selectElement,titulo) {

        selectElement.innerHTML=""

        let tituloSelect = document.createElement('option');
        tituloSelect.value = "-1"
        tituloSelect.textContent = titulo
        selectElement.appendChild(tituloSelect);

        for (const item of items) {
            let option = document.createElement('option');
            option.value = item.id;
            option.textContent = item.codigoEquipo;
          
            selectElement.appendChild(option);
        }
    }

     /**
     * Informar al usuario del alta exitosa.
     * @param {Boolean} activar Activa o no mensaje éxito.
     */
     exitoAlta(activar) {
        

        /*if(!this.esModificacion){
            this.formAlta.reset();
            this.formAlta.classList.remove('was-validated');
        }*/
       
        this.divCargandoAlta.style.display = 'none';
        this.divExitoAlta.style.display = activar ? 'block' : 'none';

    }

    
      /**
     * Cargar thead tabla hijos.
     */
      cargarEncabezado() {
       // this.thead.innerHTML = '';
        

        let trHeadInfo = document.createElement('tr');
        trHeadInfo.setAttribute('id', 'trInfo');
        trHeadInfo.setAttribute('class', 'titulos')

        let tdCodigoEquipo = document.createElement('td');
        tdCodigoEquipo.textContent = 'Codigo';
        trHeadInfo.appendChild(tdCodigoEquipo);

        let tdFecha = document.createElement('td');
        tdFecha.textContent = 'Fecha Incidencia';
        trHeadInfo.appendChild(tdFecha);

        let tdAsunto = document.createElement('td');
        tdAsunto.textContent = 'Asunto';
        trHeadInfo.appendChild(tdAsunto);
     
        this.thead.appendChild(trHeadInfo);
    }

     /**
     * Carga tabla con los hijos.
     * @param {Array} usuarios Listado de hijos.
     */
     cargarListado(mantenimientos) {
        console.log(mantenimientos)

        this.tbody.innerHTML = '';  // Limpiar tabla para sustituirla con nuevos datos.

        if (mantenimientos != null) {
            for (const mantenimiento of mantenimientos) {

               
                let tr = document.createElement('tr');
                this.tbody.appendChild(tr);
                   
                let tdCodigoEquipo = document.createElement('td');
                tr.appendChild(tdCodigoEquipo);
                tdCodigoEquipo.textContent = mantenimiento.codigoEquipo

                let td1 = document.createElement('td');
                tr.appendChild(td1);
                td1.textContent = mantenimiento.fechaIncidencia;
                
                let tdAsunto = document.createElement('td');
                tr.appendChild(tdAsunto);
                tdAsunto.textContent = mantenimiento.asunto;
 
            }

        } 
    }

    //ingresar arrelo a los campos de los equipos
    ingresarMantenimientos() {
        
        
        if(confirm("Pulse aceptar para mandar la solicitud")){

            if(this.esModificacion){
                const datos = {
                    'id': this.idMantenimiento,
                    'idEquipo': parseInt(this.selectsAlta[0].value),
                    'descripcion': this.inputsAlta[1].value
                        
                };
                this.divCargandoAlta.style.display = 'block';
                this.controlador.modificarMantenimiento(datos);
            }
            if(!this.esModificacion){
                
                const datos = {
                    'idEquipo': parseInt(this.selectsAlta[0].value),
                    'descripcion': this.inputsAlta[1].value
                    
                };
        
                //this.divCargandoAlta.style.display = 'block';
                console.log("ingresando como profesional")
                this.controlador.ingresarMantenimientos(datos);
            }
        }
    }


     modificar(mantenimiento){
        this.mostrarOcultarCrud(false,true,true)

        console.log(mantenimiento)

        this.idMantenimiento = mantenimiento.id


        this.divFormularios[0].style.display = 'none'
        this.divFormularios[1].style.display = 'block'
        this.divFormularios[3].style.display = 'block'
        
        this.divFormularios[4].style.display = 'block'
        

        this.divFormularios[5].style.display = 'block'


        this.inputsAlta[0].value = mantenimiento.codigoEquipo
        this.inputsAlta[0].readOnly = true

        this.inputsAlta[1].value = mantenimiento.descripcion
        this.inputsAlta[1].readOnly = true
       

        this.inputsAlta[2].value = mantenimiento.solucion
       
        this.inputsAlta[3].value = mantenimiento.fechaArreglo

        this.inputsAlta[4].value = mantenimiento.nombreArregla


       /* this.divFormularios[0].style.display = 'block'

        

        console.log(this.inputsAlta[0])
        
       
        */
    }

    mostrar(ver) {
        super.mostrar(ver);
    }

    mostrarFlex(ver) {
        super.mostrarFlex(ver);
    }
 }
