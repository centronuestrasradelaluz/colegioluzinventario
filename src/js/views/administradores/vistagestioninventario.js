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
        this.divConsultaEquipos = this.div.querySelector('#divConsultaEquipo');
       //Elementos vista Listado

       this.thead = this.div.getElementsByTagName('thead')[0];
       this.tbody = this.div.getElementsByTagName('tbody')[0];
       this.busqueda = ""
       //this.cargarEncabezado();

       //Elmentos consulta equipo

       this.fichaTecnica = this.div.querySelector('#divFichaTecnica');
       this.tablaMantenimiento = this.div.querySelector('#divTablaMantenimiento')
  
       //Botones de la vista
       this.botonVolverAltaEquipos = this.div.querySelector('#botonVolverAltaEquipos');
       this.botonVolverAltaEquipos.addEventListener('click', this.volver.bind(this));

       this.botonVolverConsultaEquipos = this.div.querySelector('#botonVolverConsultaEquipos');
       this.botonVolverConsultaEquipos.addEventListener('click', this.volver.bind(this));
       
       this.botonAnadir = this.div.querySelector('#aceptarEquipos')
       this.botonAnadir.addEventListener('click', this.ingresarEquipo.bind(this));

       //Formulario de la vista e inputs
       this.formAlta = this.div.getElementsByTagName('form')[0];
       this.inputsAlta = this.formAlta.getElementsByTagName('input');
       this.selectsAlta = this.formAlta.getElementsByTagName('select');

       this.divExitoAlta = this.div.querySelector('#divExito');
       this.divCargandoAlta = this.div.querySelector('#loadingImg');

       this.esModificacion = false
      
       this.paginaActual = 0;
       this.equipos = []


       this.selectLinea = this.div.querySelector("#selectLinea")
       this.selectOS = this.div.querySelector("#selectSistemaOperativo")
       this.selectTE = this.div.querySelector("#selectTipoEquipo")
        this.controlador.dameEquipos("")
       
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

    rellenarSelects(resultados) {

        console.log(resultados)
        for (const linea of resultados["linea"]) {

           let opcionLinea = document.createElement('option');
           opcionLinea.textContent = linea.nombre;
           opcionLinea.value = linea.id;
            
            this.selectLinea.appendChild(opcionLinea);
        }
        for (const SO of resultados["sistemaOperativo"]) {

            
           let opcionSO = document.createElement('option');
           opcionSO.textContent = SO.nombre;
           opcionSO.value = SO.id;
            
            this.selectOS.appendChild(opcionSO);
        }
        for (const TE of resultados["tipoEquipo"]) {

           let opcionTE = document.createElement('option');
           opcionTE.textContent = TE.nombre;
           opcionTE.value = TE.id;
            
            this.selectTE.appendChild(opcionTE);
        }
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

        this.divAltaEquipos.style.display = alta ? 'block' : 'none';
        this.divListadoEquipos.style.display = listado ? 'block' : 'none';
        this.divConsultaEquipos.style.display = consulta ? 'block': 'none';
       
        console.log('modificacion global', this.esModificacion)
    }
    anadir() {
        this.mostrarOcultarCrud(false, true, false,false);
       
    }
    //modificar arrelo a los campos de los equipos
    modificar(equipo){

        this.mostrarOcultarCrud(false,true,true,false)
        this.idEquipo = equipo.id;
        this.inputsAlta[0].value = equipo.codigoEquipo;
        this.inputsAlta[1].value = equipo.proveedor;
        this.inputsAlta[2].value = equipo.marca;
        this.inputsAlta[3].value = equipo.discoDuro;
        this.inputsAlta[4].value = equipo.procesador;
        this.inputsAlta[5].value = equipo.ubicacion;
        this.inputsAlta[6].value = equipo.ram;
        this.inputsAlta[7].value = equipo.grafica;
        this.inputsAlta[8].value = equipo.fechaCompra;
        this.inputsAlta[9].value = equipo.observaciones;
        this.inputsAlta[10].value = equipo.valorEquipo;

        this.selectsAlta[0].value = equipo.idLinea;
        this.selectsAlta[1].value = equipo.idSistemaOperativo;
        this.selectsAlta[2].value = equipo.idTipoEquipo;
    }

    volver() {

        this.mostrarOcultarCrud(true, false,false,false)

        this.formAlta.reset()

        if(this.divExitoAlta.style.display == 'block'){}
        
        this.divExitoAlta.style.display = "none"
        this.formAlta.classList.remove('was-validated');
           
    }
 //ingresar arrelo a los campos de los equipos
    ingresarEquipo() {
        console.log(this.selectsAlta)


        /*
        const fileInput = document.getElementById('fileInput');
        const file = fileInput.files[0];

        const formData = new FormData();
        formData.append('image', file);

        */
       
        if(this.esModificacion){
            const datos = {
                'id': this.idEquipo,
                'codigoEquipo': this.inputsAlta[0].value,
                'proveedor': this.inputsAlta[1].value,
                'marca': this.inputsAlta[2].value,
                'discoDuro': this.inputsAlta[3].value,
                'procesador': this.inputsAlta[4].value,
                'ubicacion': this.inputsAlta[5].value,
                'ram': this.inputsAlta[6].value,
                'grafica': this.inputsAlta[7].value,
                'fechaCompra': this.inputsAlta[8].value,
                'observaciones': this.inputsAlta[9].value,
                'valorEquipo': parseFloat(this.inputsAlta[10].value),
                'idLinea': parseInt(this.selectsAlta[0].value),
                'idSistemaOperativo': parseInt(this.selectsAlta[1].value),
                'idTipoEquipo': parseInt(this.selectsAlta[2].value)
            };
            this.divCargandoAlta.style.display = 'block';
            this.controlador.modificarEquipos(datos);
        }
        if(!this.esModificacion){
            const datos = {
                'codigoEquipo': this.inputsAlta[0].value,
                'proveedor': this.inputsAlta[1].value,
                'marca': this.inputsAlta[2].value,
                'discoDuro': this.inputsAlta[3].value,
                'procesador': this.inputsAlta[4].value,
                'ubicacion': this.inputsAlta[5].value,
                'ram': this.inputsAlta[6].value,
                'grafica': this.inputsAlta[7].value,
                'fechaCompra': this.inputsAlta[8].value,
                'observaciones': this.inputsAlta[9].value,
                'valorEquipo': parseFloat(this.inputsAlta[10].value),
                'idLinea': parseInt(this.selectsAlta[0].value),
                'idSistemaOperativo': parseInt(this.selectsAlta[1].value),
                'idTipoEquipo': parseInt(this.selectsAlta[2].value)
            };
            this.divCargandoAlta.style.display = 'block';
            this.controlador.ingresarEquipos(datos);
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
        this.thead.innerHTML = '';
        
        let trBusqueda = document.createElement('tr');
        let tdBusqueda = document.createElement('td');
        tdBusqueda.setAttribute('class', 'buscar')
        tdBusqueda.setAttribute('colspan', '2');

        let inputBusqueda = document.createElement('input');
        inputBusqueda.setAttribute('type', 'text');
        inputBusqueda.setAttribute('name', 'busqueda');
        inputBusqueda.setAttribute('class', 'input-buscar')
        inputBusqueda.setAttribute('placeholder', 'Busca por codigo de equipo')
        inputBusqueda.value = this.busqueda
        
       
        inputBusqueda.addEventListener('input', this.debounce((event) => {
            
            const textoInput = event.target.value;
            this.escribir(textoInput); // Llama al método escribir con el valor del input
        },1000));

        tdBusqueda.appendChild(inputBusqueda);

        


        let tdAnadir = document.createElement('td');
        tdAnadir.setAttribute('id', 'añadir');
        tdAnadir.setAttribute('colspan', '2');
        tdAnadir.setAttribute('class','añadir')
        
        let botonAnadirTabla = document.createElement('button')
        botonAnadirTabla.setAttribute('class', 'add-users-btn')
        botonAnadirTabla.textContent='Añadir Equipo'
        

        tdAnadir.appendChild(botonAnadirTabla)

        botonAnadirTabla.addEventListener('click', this.anadir.bind(this));

        trBusqueda.appendChild(tdBusqueda)
        trBusqueda.appendChild(tdAnadir)

        let trHeadInfo = document.createElement('tr');
        trHeadInfo.setAttribute('id', 'trInfo');
        trHeadInfo.setAttribute('class', 'titulos')

        let tdCodigoEquipo = document.createElement('td');
        tdCodigoEquipo.textContent = 'Codigo';
       
        trHeadInfo.appendChild(tdCodigoEquipo);

        let tdUbicacion = document.createElement('td');
        tdUbicacion.textContent = 'Ubicacion';
        trHeadInfo.appendChild(tdUbicacion);

        let tdOpciones = document.createElement('td');
        tdOpciones.textContent = 'Opciones';
       
        trHeadInfo.appendChild(tdOpciones);

        this.thead.appendChild(trBusqueda)
        
        this.thead.appendChild(trHeadInfo);
    }

     /**
     * Carga tabla con los hijos.
     * @param {Array} usuarios Listado de hijos.
     */
     cargarListado(equiposConMantenimiento) {
        console.log(equiposConMantenimiento)
        this.cargarEncabezado()
        this.equipos = equiposConMantenimiento
        this.tbody.innerHTML = '';  // Limpiar tabla para sustituirla con nuevos datos.

        let totalPaginas = Math.ceil(equiposConMantenimiento.length / 5);

        let inicio = this.paginaActual * 5;
        let fin = Math.min((this.paginaActual + 1) * 5, equiposConMantenimiento.length);
        
        for (let i = inicio; i < fin; i++) {
            const equipoConMantenimiento = equiposConMantenimiento[i];

            const equipo = equipoConMantenimiento.equipo

            let tr = document.createElement('tr');
                this.tbody.appendChild(tr);
                
                let td1 = document.createElement('td');
                tr.appendChild(td1);
                td1.textContent = equipo.codigoEquipo;

                let tdUbicacion = document.createElement('td');
                tr.appendChild(tdUbicacion);
                tdUbicacion.textContent = equipo.ubicacion

               /* let tdRol = document.createElement('td');
                tr.appendChild(tdRol);*/

                let td2 = document.createElement('td');
                td2.classList.add('options');
                td2.setAttribute('colspan', '2');
                tr.appendChild(td2);

                let iconoConsultar = document.createElement('img');
                iconoConsultar.setAttribute('src','./img/icons/ico_lupa.png');
                iconoConsultar.setAttribute('class', 'iconos')
                iconoConsultar.setAttribute('alt', 'Consultar usuario');
                iconoConsultar.setAttribute('title','Consultar usuario');
                iconoConsultar.addEventListener('click', this.consultar.bind(this, equipoConMantenimiento));
                td2.appendChild(iconoConsultar);

                let iconoEditar = document.createElement('img');
                iconoEditar.setAttribute('src','./img/icons/ico_editar.png');
                iconoEditar.setAttribute('class', 'iconos')
                iconoEditar.setAttribute('alt', 'Modificar usuario');
                iconoEditar.setAttribute('title','Modificar usuario');
                iconoEditar.addEventListener('click', this.modificar.bind(this, equipo));
                td2.appendChild(iconoEditar);

               /* let iconoEliminar = document.createElement('img');
                iconoEliminar.setAttribute('src', './img/icons/ico_eliminar.png');
                iconoEliminar.setAttribute('class', 'iconos')
                iconoEliminar.setAttribute('alt', 'Eliminar usuario');
                iconoEliminar.setAttribute('title', 'Eliminar usuario');
                iconoEliminar.addEventListener('click', this.eliminarEquipo.bind(this, equipo.id))
                td2.appendChild(iconoEliminar);*/
        }
                //CREANDO LA FILA DE BOTONES
                if (equiposConMantenimiento.length>5)
                this.crearFilaBotones(totalPaginas)
        
    }

    crearFilaBotones(totalPaginas) {
            
        let trBotones = document.createElement('tr')
        this.tbody.appendChild(trBotones);

        let tdAnterior = document.createElement('td');
        trBotones.appendChild(tdAnterior);

        let tdEspacio = document.createElement('td');
        trBotones.appendChild(tdEspacio)
        tdEspacio.textContent = (this.paginaActual+1) + "/ "+ parseInt(totalPaginas)

        let tdSiguiente = document.createElement('td');
        trBotones.appendChild(tdSiguiente);

        let botonAnterior = document.createElement('button')
        botonAnterior.setAttribute('class', 'add-users-btn')
        botonAnterior.textContent='Anterior'

        let botonSiguiente = document.createElement('button')
        botonSiguiente.setAttribute('class', 'add-users-btn')
        botonSiguiente.textContent='Siguiente'

        tdAnterior.appendChild(botonAnterior)
        tdSiguiente.appendChild(botonSiguiente)


        botonAnterior.addEventListener('click', () => this.mostrarPaginaAnterior());
        botonSiguiente.addEventListener('click', () => this.mostrarPaginaSiguiente(totalPaginas));
    }


    mostrarPaginaSiguiente(totalPaginas) {
        
        // this.tbody.textContent = ""


        if (this.paginaActual < totalPaginas - 1) {
        this.paginaActual++;
            this.cargarListado(this.equipos)
        }
        else{
            this.cargarListado(this.equipos)
        }


    }

    mostrarPaginaAnterior() {
        //this.tbody.textContent = ""
        if (this.paginaActual > 0) {
            this.paginaActual--;
            this.cargarListado(this.equipos)
        }
        else
        {
            this.cargarListado(this.equipos)
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

    consultar(equipoConMantenimiento){
        this.fichaTecnica.textContent=""
        this.tablaMantenimiento.textContent=""
      
        const equipo = equipoConMantenimiento.equipo

        const propiedadesAMostrar = ['codigoEquipo', 'discoDuro', 'fechaCompra',
         'grafica', 'marca', 'observaciones', 'procesador', 'proveedor', 'ram', 'ubicacion', 'valorEquipo'];
        
         const mantenimiento = equipoConMantenimiento.mantenimientos
        console.log(mantenimiento)
        this.mostrarOcultarCrud(false,false,false,true)

        // Crear título de la ficha técnica
        let titulo = document.createElement('h2');
        titulo.textContent = "Ficha Técnica";

        // Añadir título al contenedor principal
        this.fichaTecnica.appendChild(titulo);

      // Iterar sobre las propiedades que deseas mostrar
     propiedadesAMostrar.forEach(propiedad => {
        // Verificar si la propiedad existe en el objeto equipo
            if (equipo.hasOwnProperty(propiedad)) {
                // Crear un párrafo para cada propiedad y su valor
                let parrafo = document.createElement('p');
                parrafo.innerHTML = `<span class="negrita">${propiedad}</span>: ${equipo[propiedad]}`;

                // Añadir el párrafo al contenedor principal
                this.fichaTecnica.appendChild(parrafo);
        }
    });
        // Añadir la ficha técnica al elemento deseado del DOM
       
    this.divConsultaEquipos.appendChild(this.fichaTecnica);
        // Crear encabezado de la tabla
        let encabezado = document.createElement('tr');

        let thFecha = document.createElement('th');
        thFecha.textContent = 'Fecha de la Incidencia';
        encabezado.appendChild(thFecha);

        let thDescripcion = document.createElement('th');
        thDescripcion.textContent = 'Descripción';
        encabezado.appendChild(thDescripcion);

        let thOpciones = document.createElement('th');
        thOpciones.textContent = 'Opciones';
        encabezado.appendChild(thOpciones);

        this.tablaMantenimiento.appendChild(encabezado);

        // Iterar sobre los datos de mantenimiento y crear filas de la tabla

        if(mantenimiento.length === 0){
            let fila = document.createElement('tr');
            let tdSinRegistro = document.createElement('td');
            tdSinRegistro.textContent="No existen mantenimientos para el equipo"
            tdSinRegistro.setAttribute("colspan", "3")
            fila.appendChild(tdSinRegistro)
           this.tablaMantenimiento.appendChild(fila);
            
        }
        else{
            mantenimiento.forEach(item => {
            let fila = document.createElement('tr');

            // Columna para la fecha de la incidencia
            let tdFecha = document.createElement('td');
            tdFecha.textContent = item.fechaIncidencia;
            fila.appendChild(tdFecha);

            // Columna para la descripción
            let tdDescripcion = document.createElement('td');
            tdDescripcion.textContent = item.descripcion;
            fila.appendChild(tdDescripcion);

            // Columna para las opciones (aquí puedes añadir botones u otros elementos según necesites)
            let tdOpciones = document.createElement('td');
            // Por ejemplo, añadir un botón de eliminar
            let botonVisualizar = document.createElement('button');

            tdOpciones.appendChild(botonVisualizar);
            fila.appendChild(tdOpciones);

            this.tablaMantenimiento.appendChild(fila);
        });
          
        }
        // Añadir la tabla de mantenimiento al documento

        this.divConsultaEquipos.appendChild(this.tablaMantenimiento);

       
        }
     

    /*eliminarEquipo(id) {
        if(confirm("¿Estas seguro de eliminar el equipo? Este proceso será irreversible"))
        {
            this.controlador.eliminarEquipo(id)
        }
    }*/


    mostrar(ver) {
        super.mostrar(ver);

        
        if (this.divExitoAlta.style.display == 'block')
        this.exitoAlta(false);
    }
}