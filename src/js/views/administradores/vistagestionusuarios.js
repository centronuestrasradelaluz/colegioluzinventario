import { Vista } from '../vista.js';
import { Formulario } from '../formulario.js'; // Importa la clase del formulario dinámico

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
       
        //Parametros necesarios para cargar la vista
        this.idUsuario = 0
        
        this.esModificacion = false
        this.controlador.dameUsuarios("")
        this.mostrarOcultarCrud(true,false,false)

        // Crear instancia del formulario dinámico y generar el formulario
        const idContenedor = 'divAltaUsuarios'; // ID del div donde se agregará el formulario
        this.formulario = new Formulario(this, idContenedor);


        // Definir los items del formulario
        this.items = [
            { label: 'Nombre Usuario (*)', type: 'text', name: 'nombreUsuario', id:'nombreUsuario'},
            { label: 'Dirección de email (*)', type: 'text', name: 'email', id:'email'},
            { label: ['Profesional', 'Técnico'], type: 'radio', name: 'tipo', id:'tipo', value1:'', value:['pro', 'adm']},
            { label: ['Inactivo', 'Activo'], type: 'radio', name: 'estado', id:'estado', value1:'', value:[0, 1]},
            { label: 'Observaciones', type: 'textarea', name: 'observaciones', id:'observaciones'},
            { label: 'Contraseña', type: 'password', name: 'contraseña', id:'contraseña'},
            { label: 'Repita la contraseña (*)', type: 'password', name: 'contraseña2', id:'contraseña2'}
        ];
        // Generar el formulario dinámico después de la creación de la fila de botones
        this.formulario.generarFormulario(this.items);
    
    }


    //metodo para ocultar el crud de la gestion de hijos

    mostrarOcultarCrud(listado, alta, modificacion){
        this.esModificacion = alta && modificacion;

        this.divAltaUsuarios.style.display = alta || modificacion ? 'block' : 'none';
        this.divListadoUsuarios.style.display = listado ? 'block' : 'none';

        console.log('modificacion global', this.esModificacion);
    }
    anadir() {
        this.mostrarOcultarCrud(false, true, false);
        this.formulario.mostrarOcultarItem("estado", true)
        this.formulario.setChecked('tipo', 'pro')
    }

    modificar(usuario){
        console.log(usuario)
        this.mostrarOcultarCrud(false,true,true)
        this.formulario.mostrarOcultarItem("estado", false)
        this.idUsuario = usuario.id;
        this.formulario.setValue('nombreUsuario', usuario.nombre)
        this.formulario.setValue('email', usuario.correo)
        this.formulario.setValue('observaciones', usuario.observaciones)
        this.formulario.setValue('contraseña', usuario.contraseña)
        this.formulario.setValue('contraseña2', usuario.contraseña)
      
         // Marcar como seleccionado el botón de radio correspondiente a usuario.rol
        if (usuario.rol === 'adm' || usuario.rol === 'pro') {
           
            if (usuario.rol === 'adm') {
                this.formulario.setChecked('tipo', 'adm');
            } else {
                this.formulario.setChecked('tipo', 'pro');
            }
        }
        if (usuario.estado == 1 || usuario.estado ===0) {
           
            if (usuario.estado == 1) {
                this.formulario.setChecked('estado', '1');
            } else {
                this.formulario.setChecked('estado', '0');
            }
        }

       
    }
    volver() {

        this.mostrarOcultarCrud(true, false,false)
        this.formulario.reseteo()
    }

    ingresarDatos() {

        //FALTA VALIDAR
     
            // Check de contraseñas
            if (this.formulario.getValue('contraseña') === this.formulario.getValue('contraseña2')) {
                if(this.esModificacion){
                    const datos = {
                        'id': this.idUsuario,
                        'nombre': this.formulario.getValue('nombreUsuario'),
                        'correo': this.formulario.getValue('email'),
                        'rol': this.formulario.getValue('tipo'),
                        'estado': this.formulario.getValue('estado'),
                        'observaciones': this.formulario.getValue('observaciones'),
                        'contrasenia': this.formulario.getValue('contraseña')
                    };

                    console.log(datos)
                    //this.divCargandoAlta.style.display = 'block';
                    this.controlador.modificarUsuarios(datos);
                }
                if(!this.esModificacion){
                    const datos = {
                        'nombre': this.formulario.getValue('nombreUsuario'),
                        'correo': this.formulario.getValue('email'),
                        'rol': this.formulario.getValue('tipo'),
                        'observaciones': this.formulario.getValue('observaciones'),
                        'contrasenia': this.formulario.getValue('contraseña')
                    };
                    //this.divCargandoAlta.style.display = 'block';
                    this.controlador.ingresarUsuarios(datos);
                }
            }
            else {
                console.log("Las contraseñas no coinciden")
            }
        
    }

    // Definir función de debounce
    /*Esta función se utiliza para limitar la frecuencia de ejecución de una función en respuesta a eventos como entrada de usuario. */
    debounce(func, delay) {
        let timer;
        return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(context, args);
        }, delay);
        };
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
        tdBusqueda.setAttribute('colspan', '4');
        tdBusqueda.setAttribute('class', 'buscar')

        let inputBusqueda = document.createElement('input');
        inputBusqueda.setAttribute('class', 'input-buscar')
        inputBusqueda.setAttribute('type', 'text');
        inputBusqueda.setAttribute('name', 'busqueda');
        inputBusqueda.setAttribute('placeholder', 'Busca por nombre')
        inputBusqueda.value = this.busqueda
        

        inputBusqueda.addEventListener('input', this.debounce((event) => {
            
            const textoInput = event.target.value;
            this.escribir(textoInput); // Llama al método escribir con el valor del input
        },1000));

        tdBusqueda.appendChild(inputBusqueda);


        let tdAnadir = document.createElement('td');
        tdAnadir.setAttribute('id', 'añadir');
        tdAnadir.setAttribute('class', 'añadir');
        tdAnadir.setAttribute('colspan', '2');

        let botonAnadirTabla = document.createElement('button')
        botonAnadirTabla.setAttribute('class', 'add-users-btn')
        botonAnadirTabla.textContent='Añadir Usuario'

        tdAnadir.appendChild(botonAnadirTabla)
        botonAnadirTabla.addEventListener('click', this.anadir.bind(this));

        trBusqueda.appendChild(tdBusqueda)

        let trHeadInfo = document.createElement('tr');
        trHeadInfo.setAttribute('id', 'trInfo');
        trHeadInfo.setAttribute('class', 'titulos')

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

       /* if (this.divExitoAlta.style.display == 'block')
        this.exitoAlta(false);*/
    }
}