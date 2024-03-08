import { Vista } from '../vista.js';

/**
 * Contiene la vista de la Gestion de Usuarios
 */
export class VistaGestionUsuarios extends Vista {
    /**
	 *	Constructor de la clase.
	 *	@param {ControladorAdministradores} controlador Controlador de la vista.
	 *	@param {HTMLDivElement} div Div de HTML en el que se desplegará la vista.
	 */
    constructor(controlador, div) {
        super(controlador, div);

       //Secciones de la Vista

       this.divListadoUsuarios = this.div.querySelector('#divListadoUsuarios');
       this.divAltaUsuarios = this.div.querySelector('#divAltaUsuarios');

       //Elementos vista Listado

       this.thead = this.div.getElementsByTagName('thead')[0];
       this.tbody = this.div.getElementsByTagName('tbody')[0];
       this.busqueda = ""
       this.cargarEncabezado();

       //Botones de la vista
       this.botonVolverAltaUsuarios = this.div.querySelector('#botonVolverAltaUsuarios');
       this.botonVolverAltaUsuarios.addEventListener('click', this.volver.bind(this));

       this.botonAnadir = this.div.querySelector('#aceptar')
       this.botonAnadir.addEventListener('click', this.ingresarUsuario.bind(this));

       //Formulario de la vista e inputs
       this.formAlta = this.div.getElementsByTagName('form')[0];
       this.inputsAlta = this.formAlta.getElementsByTagName('input');

       this.divExitoAlta = this.div.querySelector('#divExito');
       this.divCargandoAlta = this.div.querySelector('#loadingImg');

       
        //Parametros necesarios para cargar la vista
        this.idUsuario = 0
        this.campoEstado = this.div.querySelector("#estado")
        
        this.esModificacion = false
        this.controlador.dameUsuarios("")
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

        this.divAltaUsuarios.style.display = alta ? 'block' : 'none';
        this.divListadoUsuarios.style.display = listado ? 'block' : 'none';

       

        console.log('modificacion global', this.esModificacion)
    }
    anadir() {
        this.mostrarOcultarCrud(false, true, false);
        this.campoEstado.style.display = "none"
    }

    modificar(usuario){
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

    ingresarUsuario() {
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
       this.controlador.dameUsuarios(texto)
    }

      /**
     * Cargar thead tabla hijos.
     */
      cargarEncabezado() {
        //this.thead.innerHTML = '';
        
        let trBusqueda = document.createElement('tr');
        let tdBusqueda = document.createElement('td');
        tdBusqueda.setAttribute('colspan', '3');

        let inputBusqueda = document.createElement('input');
        inputBusqueda.setAttribute('type', 'text');
        inputBusqueda.setAttribute('name', 'busqueda');
        inputBusqueda.setAttribute('placeholder', 'Busca por nombre')
        inputBusqueda.value = this.busqueda
        
        inputBusqueda.addEventListener('input', (event) => {
            
            const textoInput = event.target.value;
            this.escribir(textoInput); // Llama al método escribir con el valor del input
        });

        tdBusqueda.appendChild(inputBusqueda);


        let tdAnadir = document.createElement('td');
        tdAnadir.setAttribute('id', 'añadir');
        tdAnadir.setAttribute('colspan', '2');

        let botonAnadirTabla = document.createElement('button')
        botonAnadirTabla.setAttribute('class', 'add-users-btn')
        botonAnadirTabla.textContent='Añadir Usuario'

        tdAnadir.appendChild(botonAnadirTabla)
        tdAnadir.addEventListener('click', this.anadir.bind(this));

        trBusqueda.appendChild(tdBusqueda)

        let trHeadInfo = document.createElement('tr');
        trHeadInfo.setAttribute('id', 'trInfo');

        let tdNombre = document.createElement('td');
        tdNombre.textContent = 'Nombre';
        trHeadInfo.appendChild(tdNombre);

        let tdCorreo = document.createElement('td');
        tdCorreo.textContent = 'Correo';
        trHeadInfo.appendChild(tdCorreo);

        //Cambiar en un futuro al cambiar los campos que se haga un update en base de datos

        let tdRol = document.createElement('td');
        tdRol.textContent = 'Rol';
        trHeadInfo.appendChild(tdRol);

        let tdEstado = document.createElement('td');
        tdEstado.textContent = 'Estado';
        trHeadInfo.appendChild(tdEstado);

        let tdOpciones = document.createElement('td');
        tdOpciones.textContent = 'Opciones';
        trHeadInfo.appendChild(tdOpciones);

        trBusqueda.appendChild(tdAnadir)
        this.thead.appendChild(trBusqueda)
        this.thead.appendChild(trHeadInfo);
    }

    

     /**
     * Carga tabla con los hijos.
     * @param {Array} usuarios Listado de hijos.
     */
     cargarListado(usuarios) {
        
        this.tbody.innerHTML = '';  // Limpiar tabla para sustituirla con nuevos datos.

        if (usuarios != null) {
            for (const usuario of usuarios) {
                let tr = document.createElement('tr');
                this.tbody.appendChild(tr);
                
                let td1 = document.createElement('td');
                tr.appendChild(td1);
                td1.textContent = usuario.nombre;

                let tdCorreo = document.createElement('td');
                tr.appendChild(tdCorreo);
                tdCorreo.textContent = usuario.correo

                let tdRol = document.createElement('td');
                tr.appendChild(tdRol);

                if (usuario.rol == "adm")
                tdRol.textContent = "tecnico"
                else if (usuario.rol == "pro")
                tdRol.textContent = "profesional"

                let tdEstado = document.createElement('td');
                tr.appendChild(tdEstado);

                if (usuario.estado == 1)
                tdEstado.textContent = "Activo"
                else if (usuario.estado == 0)
                tdEstado.textContent = "Inactivo"

                let td2 = document.createElement('td');
                td2.classList.add('options');
                td2.setAttribute('colspan', '2');
                tr.appendChild(td2);

                let iconoEditar = document.createElement('img');
                iconoEditar.setAttribute('src','./img/icons/ico_editar.png');
                iconoEditar.setAttribute('class', 'iconos')
                iconoEditar.setAttribute('alt', 'Modificar usuario');
                iconoEditar.setAttribute('title','Modificar usuario');
                iconoEditar.addEventListener('click', this.modificar.bind(this, usuario));
                td2.appendChild(iconoEditar);

                let iconoEliminar = document.createElement('img');
                iconoEliminar.setAttribute('src', './img/icons/ico_eliminar.png');
                iconoEliminar.setAttribute('class', 'iconos')
                iconoEliminar.setAttribute('alt', 'Eliminar usuario');
                iconoEliminar.setAttribute('title', 'Eliminar usuario');
                iconoEliminar.addEventListener('click', this.eliminarUsuario.bind(this, usuario.id))
                td2.appendChild(iconoEliminar);
            }

        } 
    }

    eliminarUsuario(id) {
        if(confirm("¿Estas seguro de eliminar al usuario? Este proceso será irreversible"))
        {
            this.controlador.eliminarUsuario(id)
        }
    }

    mostrar(ver) {
        super.mostrar(ver);

        if (this.divExitoAlta.style.display == 'block')
        this.exitoAlta(false);
    }
}