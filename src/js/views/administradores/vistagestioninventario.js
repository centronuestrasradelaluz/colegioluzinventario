import { Vista } from '../vista.js';

/**
 * Contiene la vista del inicio
 */
export class VistaGestionInventario extends Vista {
    /**
	 *	Constructor de la clase.
	 *	@param {ControladorPadres} controlador Controlador de la vista.
	 *	@param {HTMLDivElement} div Div de HTML en el que se desplegará la vista.
	 */
    constructor(controlador, div) {
        super(controlador, div);

        this.divListadoEquipos = this.div.querySelector('#divListadoEquipos');
        this.divAltaEquipos = this.div.querySelector('#divAltaEquipos');

       //Elementos vista Listado

       this.thead = this.div.getElementsByTagName('thead')[0];
       this.tbody = this.div.getElementsByTagName('tbody')[0];
       this.busqueda = ""
       this.cargarEncabezado();

       //Botones de la vista
       this.botonVolverAltaEquipos = this.div.querySelector('#botonVolverAltaEquipos');
       this.botonVolverAltaEquipos.addEventListener('click', this.volver.bind(this));

       this.botonAnadir = this.div.querySelector('#aceptar')
       this.botonAnadir.addEventListener('click', this.ingresarEquipo.bind(this));

       //Formulario de la vista e inputs
       this.formAlta = this.div.getElementsByTagName('form')[0];
       this.inputsAlta = this.formAlta.getElementsByTagName('input');

       this.divExitoAlta = this.div.querySelector('#divExito');
       this.divCargandoAlta = this.div.querySelector('#loadingImg');

       this.esModificacion = false
        this.controlador.dameEquipos("")
        this.mostrarOcultarCrud(true,false,false)
        
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

     mostrarOcultarCrud(listado, alta, modificacion){

    
        if (alta && !modificacion){
            this.esModificacion = false;
        }
        if (alta && modificacion){
            
            this.esModificacion = true;
        }
        if (listado){
            this.esModificacion = false;
        }

        this.divAltaEquipos.style.display = alta ? 'block' : 'none';
        this.divListadoEquipos.style.display = listado ? 'block' : 'none';

       
        console.log('modificacion global', this.esModificacion)
    }
    anadir() {
        this.mostrarOcultarCrud(false, true, false);
       
    }
    //modificar arrelo a los campos de los equipos
    modificar(equipo){
        this.mostrarOcultarCrud(false,true,true)
        this.campoEstado.style.display = "block"
        this.idUsuario = usuario.id;
        this.inputsAlta[0].value = usuario.nombre;
        this.inputsAlta[1].value = usuario.correo;

        if (usuario.rol == "adm"){
            this.inputsAlta[2].checked = false
            this.inputsAlta[3].checked = true
        }
        if (usuario.rol == "pro"){
            this.inputsAlta[2].checked = true
            this.inputsAlta[3].checked = false
        }
        if (usuario.estado == 1){
            this.inputsAlta[4].checked = false
            this.inputsAlta[5].checked = true
        }
        if (usuario.estado == 0){
            this.inputsAlta[4].checked = true
            this.inputsAlta[5].checked = false
        }

        this.inputsAlta[6].value = usuario.contrasenia;
        this.inputsAlta[7].value = usuario.contrasenia;

        
       
    }

    volver() {

        this.mostrarOcultarCrud(true, false,false)

        this.formAlta.reset()

        if(this.divExitoAlta.style.display == 'block'){}

        this.divExitoAlta.style.display = "none"
        this.formAlta.classList.remove('was-validated');
           
    }
 //ingresar arrelo a los campos de los equipos
    ingresarEquipo() {
        let cont;
        let total = this.inputsAlta.length;

        console.log(this.inputsAlta)

        let radioButton = ""

        let radioButton1 = null

        for (cont=0; cont<total; cont++) {
            if (!this.inputsAlta[cont].checkValidity()) break;
        }
        console.log(this.inputsAlta[3])
        this.inputsAlta[7].setCustomValidity('');
        this.formAlta.classList.add('was-validated');
        if (cont == total) {
            // Check de contraseñas
            if (this.inputsAlta[6].value === this.inputsAlta[7].value) {
                
                if(this.inputsAlta[2].checked){
                     radioButton = "pro"
                }
                else if (this.inputsAlta[3].checked)
                {
                     radioButton = "adm"
                }

                if(this.inputsAlta[4].checked){
                    radioButton1 = 0
                }else if (this.inputsAlta[5].checked){
                    radioButton1 = 1
                }
                

                if(this.esModificacion){
                    const datos = {
                        'id': this.idUsuario,
                        'nombre': this.inputsAlta[0].value,
                        'correo': this.inputsAlta[1].value,
                        'rol': radioButton,
                        'estado': radioButton1,
                        'contrasenia': this.inputsAlta[6].value
                    };
                    this.divCargandoAlta.style.display = 'block';
                    this.controlador.modificarUsuarios(datos);
                }
                if(!this.esModificacion){
                    const datos = {

                        'nombre': this.inputsAlta[0].value,
                        'correo': this.inputsAlta[1].value,
                        'rol': radioButton,
                        'contrasenia': this.inputsAlta[6].value
                    };
                    this.divCargandoAlta.style.display = 'block';
                    this.controlador.ingresarUsuarios(datos);
                }
            }
            else {
                this.inputsAlta[7].setCustomValidity('Las contraseñas no coindicen.');
                this.inputsAlta[7].reportValidity();
            }
        }
    }

    escribir(texto){
        // this.busqueda
        console.log(texto)
        this.busqueda = texto
        this.controlador.dameEquipos(texto)
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
        tdTitulo.textContent = 'Equipos';
        tdTitulo.setAttribute('colspan', '3');
        trTitulo.appendChild(tdTitulo);

        let tdAnadir = document.createElement('td');
        tdAnadir.setAttribute('id', 'añadir');
        tdAnadir.setAttribute('colspan', '2');
        tdAnadir.textContent = "Añadir equipo";
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

        let tdUbicacion = document.createElement('td');
        tdUbicacion.textContent = 'Ubicacion';
        trHeadInfo.appendChild(tdUbicacion);

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
     cargarListado(equipos) {
        
        this.tbody.innerHTML = '';  // Limpiar tabla para sustituirla con nuevos datos.

        if (equipos != null) {
            for (const equipo of equipos) {
                let tr = document.createElement('tr');
                this.tbody.appendChild(tr);
                
                let td1 = document.createElement('td');
                tr.appendChild(td1);
                td1.textContent = equipo.codigoEquipo;

                let tdUbicacion = document.createElement('td');
                tr.appendChild(tdUbicacion);
                tdUbicacion.textContent = equipo.ubicacion

                let tdRol = document.createElement('td');
                tr.appendChild(tdRol);


                let td2 = document.createElement('td');
                td2.classList.add('tdOperaciones');
                td2.setAttribute('colspan', '2');
                tr.appendChild(td2);

                let iconoEditar = document.createElement('img');
                iconoEditar.setAttribute('src','./img/icons/edit_children.svg');
                iconoEditar.setAttribute('alt', 'Modificar usuario');
                iconoEditar.setAttribute('title','Modificar usuario');
                iconoEditar.addEventListener('click', this.modificar.bind(this, equipo));
                td2.appendChild(iconoEditar);

                let iconoEliminar = document.createElement('img');
                iconoEliminar.setAttribute('src', './img/icons/person_remove.svg');
                iconoEliminar.setAttribute('alt', 'Eliminar usuario');
                iconoEliminar.setAttribute('title', 'Eliminar usuario');
                iconoEliminar.addEventListener('click', this.eliminarEquipo.bind(this, equipo.id))
                td2.appendChild(iconoEliminar);
            }

        } 
    }

    eliminarEquipo(id) {
        if(confirm("¿Estas seguro de eliminar el equipo? Este proceso será irreversible"))
        {
            this.controlador.eliminarEquipo(id)
        }
    }

     /**
     * Limpia los campos del formulario alta.
     */
    /* cancelarAlta() {
        for (let input of this.inputsAlta)
            input.value = '';

        this.mostrarOcultarCrud(true, false, false);
    }*/


    mostrar(ver) {
        super.mostrar(ver);

        
        if (this.divExitoAlta.style.display == 'block')
        this.exitoAlta(false);
    }
}