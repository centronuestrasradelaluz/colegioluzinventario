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
      // this.divConsulta = this.div.querySelector('#divConsultaMantenimientos');

       //Elementos vista Listado

       this.thead = this.div.getElementsByTagName('thead')[0];
       this.tbody = this.div.getElementsByTagName('tbody')[0];
       this.busqueda = ""
       this.cargarEncabezado();

       //Botones de la vista
       this.botonVolver = this.div.querySelector('#botonVolverMantenimientos');
       this.botonVolver.addEventListener('click', this.volver.bind(this));

       this.botonAnadir = this.div.querySelector('#aceptar')
       this.botonAnadir.addEventListener('click', this.ingresarMantenimientos.bind(this));

       //Formulario de la vista e inputs
       this.formAlta = this.div.getElementsByTagName('form')[0];
       this.inputsAlta = this.formAlta.getElementsByTagName('input');

       this.selectCodigoEquipo = this.div.querySelector("#selectCodigoEquipo")

       this.divExitoAlta = this.div.querySelector('#divExito');
       this.divCargandoAlta = this.div.querySelector('#loadingImg');

       
        //Parametros necesarios para cargar la vista
        
        this.esModificacion = false
        this.controlador.dameMantenimientos("")
      
        this.mostrarOcultarCrud(true,false,false,false)
        
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
        this.divListado.style.display = listado ? 'block' : 'none';
       // this.divConsulta.style.display = consulta ? 'block': 'none';
       
        console.log('modificacion global', this.esModificacion)
    }

    volver() {

        this.mostrarOcultarCrud(true, false,false, false)

        this.formAlta.reset()

        if(this.divExitoAlta.style.display == 'block'){}

        this.divExitoAlta.style.display = "none"
        this.formAlta.classList.remove('was-validated');
           
    }

      /**
     * Cargar thead tabla hijos.
     */
      cargarEncabezado() {
        //this.thead.innerHTML = '';
        
        let trBusqueda = document.createElement('tr');
        let tdBusqueda = document.createElement('td');
        tdBusqueda.setAttribute('colspan', '5');

        let inputBusqueda = document.createElement('input');
        inputBusqueda.setAttribute('type', 'text');
        inputBusqueda.setAttribute('name', 'busqueda');
        inputBusqueda.setAttribute('placeholder', 'Busca por codigo de equipo')
        inputBusqueda.value = this.busqueda
        
        inputBusqueda.addEventListener('input', (event) => {
            
            const textoInput = event.target.value;
            this.escribir(textoInput); // Llama al método escribir con el valor del input
        });

        tdBusqueda.appendChild(inputBusqueda);

        trBusqueda.appendChild(tdBusqueda)


        let trTitulo = document.createElement('tr');
        let tdTitulo = document.createElement('td');
        tdTitulo.textContent = 'Mantenimientos';
        tdTitulo.setAttribute('colspan', '3');
        trTitulo.appendChild(tdTitulo);

        let tdAnadir = document.createElement('td');
        tdAnadir.setAttribute('id', 'añadir');
        tdAnadir.setAttribute('colspan', '2');
        tdAnadir.textContent = "Añadir mantenimiento";
        trTitulo.appendChild(tdAnadir);

        tdAnadir.addEventListener('click', this.anadir.bind(this));

       /* let iconoInsertar = document.createElement('img');
        iconoInsertar.setAttribute('id', 'btnAnadir');
        iconoInsertar.setAttribute('src', './img/icons/add.svg');
        iconoInsertar.setAttribute('title', 'Añadir nuevo hijo');
        iconoInsertar.setAttribute('alt', 'Añadir nuevo hijo');*/
        //iconoInsertar.addEventListener('click', this.anadir.bind(this));

        //tdAnadir.appendChild(iconoInsertar);

        let trHeadInfo = document.createElement('tr');
        trHeadInfo.setAttribute('id', 'trInfo');

        let tdCodigoEquipo = document.createElement('td');
        tdCodigoEquipo.textContent = 'Codigo';
        trHeadInfo.appendChild(tdCodigoEquipo);

        let tdFecha = document.createElement('td');
        tdFecha.textContent = 'Fecha Incidencia';
        trHeadInfo.appendChild(tdFecha);

        let tdOpciones = document.createElement('td');
        tdOpciones.textContent = 'Opciones';
        tdOpciones.setAttribute('colspan', '2');
        trHeadInfo.appendChild(tdOpciones);

        this.thead.appendChild(trBusqueda)
        this.thead.appendChild(trTitulo);
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
                
                let td1 = document.createElement('td');
                tr.appendChild(td1);
                td1.textContent = mantenimiento.fechaIncidencia;

                let tdCodigoEquipo = document.createElement('td');
                tr.appendChild(tdCodigoEquipo);
                tdCodigoEquipo.textContent = mantenimiento.codigoEquipo

               /* let tdRol = document.createElement('td');
                tr.appendChild(tdRol);*/


                let td2 = document.createElement('td');
                td2.classList.add('tdOperaciones');
                td2.setAttribute('colspan', '2');
                tr.appendChild(td2);

               
                let iconoConsultar = document.createElement('img');
                iconoConsultar.setAttribute('src','./img/icons/edit_children.svg');
                iconoConsultar.setAttribute('alt', 'Consultar usuario');
                iconoConsultar.setAttribute('title','Consultar usuario');
                //iconoConsultar.addEventListener('click', this.consultar.bind(this, mantenimiento));
                td2.appendChild(iconoConsultar);

                let iconoEditar = document.createElement('img');
                iconoEditar.setAttribute('src','./img/icons/edit_children.svg');
                iconoEditar.setAttribute('alt', 'Modificar usuario');
                iconoEditar.setAttribute('title','Modificar usuario');
                //iconoEditar.addEventListener('click', this.modificar.bind(this, mantenimiento));
                td2.appendChild(iconoEditar);

                let iconoEliminar = document.createElement('img');
                iconoEliminar.setAttribute('src', './img/icons/person_remove.svg');
                iconoEliminar.setAttribute('alt', 'Eliminar usuario');
                iconoEliminar.setAttribute('title', 'Eliminar usuario');
                iconoEliminar.addEventListener('click', this.eliminar.bind(this, mantenimiento.id))
                td2.appendChild(iconoEliminar);
            }

        } 
    }

    anadir() {
        this.mostrarOcultarCrud(false, true, false,false);
       
    }

    //ingresar arrelo a los campos de los equipos
    ingresarMantenimientos() {
    
       if(this.esModificacion){
            const datos = {
                'id': this.idMantenimiento,
                'solucion': this.inputsAlta[1].value,
                'fechaSolucion':  this.inputsAlta[2].value,
                'quienSoluciona': this.inputsAlta[3].value        
            };
            this.divCargandoAlta.style.display = 'block';
            this.controlador.modificarMantenimiento(datos);
        }
        if(!this.esModificacion){
            const datos = {
                'descripcion': this.inputsAlta[0].value
                
            };
            this.divCargandoAlta.style.display = 'block';
            this.controlador.ingresarMantenimientos(datos);
    }
}

    escribir(texto){
        // this.busqueda
        console.log(texto)
        this.busqueda = texto
        this.controlador.dameMantenimientos(texto)
     }

    eliminar(id) {
        if(confirm("¿Estas seguro de eliminar el equipo? Este proceso será irreversible"))
        {
            this.controlador.eliminarMantenimiento(id)
        }
    }

    modificar(){

    }





    mostrar(ver) {
        super.mostrar(ver);
    }
}