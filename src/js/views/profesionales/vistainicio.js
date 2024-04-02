import { Vista } from '../vista.js';
import { Formulario } from '../formulario.js'; // Importa la clase del formulario dinámico

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
        
        // Crear instancia del formulario dinámico y generar el formulario
        const idContenedor = 'divAltaMantenimientosPro'; // ID del div donde se agregará el formulario
        this.formulario = new Formulario(this, idContenedor);

        // Crear el botón y agregarlo al formulario
        const botonAnadir = this.formulario.crearBotonAnadir(); 
        //this.formulario.contenedor.appendChild(botonAnadir);

        // Asignar la función ingresarMantenimientos como manejador de eventos para el botón
        botonAnadir.addEventListener('click', this.ingresarMantenimientos.bind(this));

        // Definir los items del formulario
        this.items = [
            { label: 'Codigo Equipo', type: 'select', name: 'selectCodigoEquipo', id:'selectCodigoEquipo', options: [{ value: '-1', text: 'Elija Codigo de Equipo' }] },
            { label: 'Codigo Equipo', type: 'text', name: 'codigoEquipoText' },
            { label: 'Asunto', type: 'select', name: 'selectAsunto', id:'selectAsunto', options: [{ value: '-1', text: '' }] },
            { label: 'Descripcion de la incidencia', type: 'textarea', name: 'descripcion' }
        ];
            // Generar el formulario dinámico después de la creación de la fila de botones
       
        // Obtener referencias a elementos HTML relevantes
        this.divListado = this.div.querySelector('#divListadoMantenimientosPro');
        this.divAlta = this.div.querySelector('#divAltaMantenimientosPro');
        this.thead = this.div.getElementsByTagName('thead')[0];
        this.tbody = this.div.getElementsByTagName('tbody')[0];
        this.divExitoAlta = this.div.querySelector('#divExito');
        this.divCargandoAlta = this.div.querySelector('#loadingImg');

        // Parametros necesarios para cargar la vista
        this.idMantenimiento = 0;
        this.paginaActual = 0;
        this.mantenimientos = [];
        this.esModificacion = false;

        // Obtener los mantenimientos
        this.controlador.dameMantenimientos("");
    }

    // Método para rellenar los selects del formulario dinámico
    rellenarSelects(resultados) {
        this.formulario.generarFormulario(this.items);
        this.formulario.llenarSelect(resultados["codigoEquipo"], "selectCodigoEquipo", "Elija Codigo de Equipo");
        this.formulario.llenarSelect(resultados["asunto"], "selectAsunto", "Elija una incidencia");
    }
    
    // Método para cargar el encabezado de la tabla
    cargarEncabezado() {
        this.thead.textContent = "";
        let trHeadInfo = document.createElement('tr');
        trHeadInfo.setAttribute('id', 'trInfo');
        trHeadInfo.setAttribute('class', 'titulos');

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

    // Método para cargar el listado de mantenimientos en la tabla
    cargarListado(mantenimientos) {
        this.cargarEncabezado();
        this.tbody.textContent = "";
        this.mantenimientos = mantenimientos;

        let totalPaginas = Math.ceil(mantenimientos.length / 5); // Suponiendo que quieres mostrar 5 filas por página
        let inicio = this.paginaActual * 5;
        let fin = Math.min((this.paginaActual + 1) * 5, mantenimientos.length);

        for (let i = inicio; i < fin; i++) {
            const mantenimiento = mantenimientos[i];
            let tr = document.createElement('tr');
            this.tbody.appendChild(tr);

            let tdCodigoEquipo = document.createElement('td');
            tr.appendChild(tdCodigoEquipo);
            tdCodigoEquipo.textContent = mantenimiento.codigoEquipo;

            let td1 = document.createElement('td');
            tr.appendChild(td1);
            td1.textContent = mantenimiento.fechaIncidencia;

            let tdAsunto = document.createElement('td');
            tr.appendChild(tdAsunto);
            tdAsunto.textContent = mantenimiento.frase;
        }

        if (mantenimientos.length > 5) {
            this.crearFilaBotones(totalPaginas);
        }
    }

    // Método para crear la fila de botones de paginación
    crearFilaBotones(totalPaginas) {
        let trBotones = document.createElement('tr');
        this.tbody.appendChild(trBotones);

        let tdAnterior = document.createElement('td');
        trBotones.appendChild(tdAnterior);

        let tdEspacio = document.createElement('td');
        trBotones.appendChild(tdEspacio);
        tdEspacio.textContent = (this.paginaActual + 1) + "/ " + parseInt(totalPaginas);

        let tdSiguiente = document.createElement('td');
        trBotones.appendChild(tdSiguiente);

        let botonAnterior = document.createElement('button');
        botonAnterior.setAttribute('class', 'add-users-btn');
        botonAnterior.textContent = 'Anterior';

        let botonSiguiente = document.createElement('button');
        botonSiguiente.setAttribute('class', 'add-users-btn');
        botonSiguiente.textContent = 'Siguiente';

        tdAnterior.appendChild(botonAnterior);
        tdSiguiente.appendChild(botonSiguiente);

        botonAnterior.addEventListener('click', () => this.mostrarPaginaAnterior());
        botonSiguiente.addEventListener('click', () => this.mostrarPaginaSiguiente(totalPaginas));

        
    }

    // Método para mostrar la siguiente página de resultados
    mostrarPaginaSiguiente(totalPaginas) {
        if (this.paginaActual < totalPaginas - 1) {
            this.paginaActual++;
            this.cargarListado(this.mantenimientos);
        } else {
            this.cargarListado(this.mantenimientos);
        }
    }

    // Método para mostrar la página anterior de resultados
    mostrarPaginaAnterior() {
        if (this.paginaActual > 0) {
            this.paginaActual--;
            this.cargarListado(this.mantenimientos);
        } else {
            this.cargarListado(this.mantenimientos);
        }
    }

    // Método para ingresar mantenimientos
    ingresarMantenimientos() {
        if (confirm("Pulse aceptar para mandar la solicitud")) {
            if (this.esModificacion) {
                const datos = {
                    'id': this.idMantenimiento,
                    'idEquipo': parseInt(this.formulario.getValue('selectCodigoEquipo')),
                    'descripcion': this.formulario.getValue('descripcion')
                };
                this.divCargandoAlta.style.display = 'block';
                this.controlador.modificarMantenimiento(datos);
            }
            if (!this.esModificacion) {
                const datos = {
                    'idEquipo': parseInt(this.formulario.getValue('selectCodigoEquipo')),
                    'idAsunto': parseInt(this.formulario.getValue('selectAsunto')),
                    'descripcion': this.formulario.getValue('descripcion')
                };
                this.controlador.ingresarMantenimientos(datos);
            }
        }
    }

    // Método para limpiar los campos del formulario
    limpiarCampos() {
        this.formulario.setValue('selectCodigoEquipo', '-1');
        this.formulario.setValue('selectAsunto', '-1');
        this.formulario.setValue('descripcion', '');
    }

    // Método para mostrar la información de un mantenimiento a modificar
    modificar(mantenimiento) {
        this.mostrarOcultarCrud(false, true, true);
        this.idMantenimiento = mantenimiento.id;
        this.formulario.setValue('selectCodigoEquipo', mantenimiento.codigoEquipo);
        this.formulario.setValue('descripcion', mantenimiento.descripcion);
        this.formulario.setValue('solucion', mantenimiento.solucion);
        this.formulario.setValue('fechaArreglo', mantenimiento.fechaArreglo);
        this.formulario.setValue('nombreArregla', mantenimiento.nombreArregla);
        this.formulario.setReadOnly(['selectCodigoEquipo', 'descripcion']);
    }

    // Método para mostrar la vista
    mostrar(ver) {
        super.mostrar(ver);
    }

    // Método para mostrar la vista con flexbox
    mostrarFlex(ver) {
        super.mostrarFlex(ver);
    }
}
