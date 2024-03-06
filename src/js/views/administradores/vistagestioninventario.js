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
       this.cargarEncabezado();

       //Elmentos consulta equipo

       this.theadConsulta = this.div.getElementsByTagName('thead')[1];
       this.tbodyConsulta = this.div.getElementsByTagName('tbody')[1];

       //Botones de la vista
       this.botonVolverAltaEquipos = this.div.querySelector('#botonVolverAltaEquipos');
       this.botonVolverAltaEquipos.addEventListener('click', this.volver.bind(this));

       this.botonVolverConsultaEquipos = this.div.querySelector('#botonVolverConsultaEquipos');
       this.botonVolverConsultaEquipos.addEventListener('click', this.volver.bind(this));
       
       this.botonAnadir = this.div.querySelector('#aceptar')
       this.botonAnadir.addEventListener('click', this.ingresarEquipo.bind(this));

       //Formulario de la vista e inputs
       this.formAlta = this.div.getElementsByTagName('form')[0];
       this.inputsAlta = this.formAlta.getElementsByTagName('input');
       this.selectsAlta = this.formAlta.getElementsByTagName('select');

       this.divExitoAlta = this.div.querySelector('#divExito');
       this.divCargandoAlta = this.div.querySelector('#loadingImg');

       this.esModificacion = false
      
       this.controlador.obtenerDesplegables()

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
  /*  rellenarSelects(resultados) {

        for (const li of resultados["linea"]){
            let optionLinea = document.createElement('option')
            optionLinea.value = li.id;
            optionLinea.textContent = li.nombre

            this.selectLinea.appendChild(optionLinea);
          
        }
        for (const so of resultados["sistemaOperativo"]){
            let optionSO = document.createElement('option')
            optionSO.value = so.id;
            optionSO.textContent = so.nombre

            this.selectOS.appendChild(optionSO);
        }
        for (const te of resultados["tipoEquipo"]){
            let optionTE = document.createElement('option')
            optionTE.value = te.id;
            optionTE.textContent = te.nombre

            this.selectTE.appendChild(optionTE)
        }
    }*/

    rellenarSelects(resultados) {
        this.llenarSelect(resultados["linea"], this.selectLinea);
        this.llenarSelect(resultados["sistemaOperativo"], this.selectOS);
        this.llenarSelect(resultados["tipoEquipo"], this.selectTE);
    }
    
    llenarSelect(items, selectElement) {
        for (const item of items) {
            let option = document.createElement('option');
            option.value = item.id;
            option.textContent = item.nombre;
            selectElement.appendChild(option);
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
        this.inputsAlta[3].value = equipo.monitor;
        this.inputsAlta[4].value = equipo.discoDuro;
        this.inputsAlta[5].value = equipo.procesador;
        this.inputsAlta[6].value = equipo.ubicacion;
        this.inputsAlta[7].value = equipo.ram;
        this.inputsAlta[8].value = equipo.grafica;
        this.inputsAlta[9].value = equipo.fechaCompra;
        this.inputsAlta[10].value = equipo.observaciones;
        this.inputsAlta[11].value = equipo.valorEquipo;

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

        if(this.esModificacion){
            const datos = {
                'id': this.idEquipo,
                'codigoEquipo': this.inputsAlta[0].value,
                'proveedor': this.inputsAlta[1].value,
                'marca': this.inputsAlta[2].value,
                'monitor': this.inputsAlta[3].value,
                'discoDuro': this.inputsAlta[4].value,
                'procesador': this.inputsAlta[5].value,
                'ubicacion': this.inputsAlta[6].value,
                'ram': this.inputsAlta[7].value,
                'grafica': this.inputsAlta[8].value,
                'fechaCompra': this.inputsAlta[9].value,
                'observaciones': this.inputsAlta[10].value,
                'valorEquipo': parseFloat(this.inputsAlta[11].value),
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
                'monitor': this.inputsAlta[3].value,
                'discoDuro': this.inputsAlta[4].value,
                'procesador': this.inputsAlta[5].value,
                'ubicacion': this.inputsAlta[6].value,
                'ram': this.inputsAlta[7].value,
                'grafica': this.inputsAlta[8].value,
                'fechaCompra': this.inputsAlta[9].value,
                'observaciones': this.inputsAlta[10].value,
                'valorEquipo': parseFloat(this.inputsAlta[11].value),
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
     cargarListado(equiposConMantenimiento) {
        console.log(equiposConMantenimiento)

        this.tbody.innerHTML = '';  // Limpiar tabla para sustituirla con nuevos datos.

        if (equiposConMantenimiento != null) {
            for (const equipoConMantenimiento of equiposConMantenimiento) {

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
                td2.classList.add('tdOperaciones');
                td2.setAttribute('colspan', '2');
                tr.appendChild(td2);

               
                let iconoConsultar = document.createElement('img');
                iconoConsultar.setAttribute('src','./img/icons/edit_children.svg');
                iconoConsultar.setAttribute('alt', 'Consultar usuario');
                iconoConsultar.setAttribute('title','Consultar usuario');
                iconoConsultar.addEventListener('click', this.consultar.bind(this, equipoConMantenimiento));
                td2.appendChild(iconoConsultar);

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

    consultar(equipoConMantenimiento){

        const equipo = equipoConMantenimiento.equipo
     
        const mantenimiento = equipoConMantenimiento.mantenimientos
       
        this.mostrarOcultarCrud(false,false,false,true)

        this.theadConsulta.innerHTML = '';

        let trTitulo = document.createElement('tr');
        let tdTitulo = document.createElement('td');
        tdTitulo.textContent = 'Equipo Codigo ' + equipo.codigoEquipo;
        tdTitulo.setAttribute('colspan', '2');
        trTitulo.appendChild(tdTitulo);

        let trInformacion = document.createElement('tr');
        let tdInformacion = document.createElement('td');
        tdInformacion.textContent = 'Campo'

        let tdDato = document.createElement('td');

        trInformacion.appendChild(tdInformacion);
        trInformacion.appendChild(tdDato);

        this.theadConsulta.appendChild(trTitulo);
        this.theadConsulta.appendChild(trInformacion);


        this.tbodyConsulta.innerHTML = '';

        let trProveedor = document.createElement('tr')
        let tdProveedor = document.createElement('td')
        tdProveedor.textContent = "Proveedor"
        let tdDatoProveedor = document.createElement('td')
        tdDatoProveedor.textContent = equipo.proveedor
        this.tbodyConsulta.appendChild(trProveedor)

        trProveedor.appendChild(tdProveedor)
        trProveedor.appendChild(tdDatoProveedor)

        let trMarca = document.createElement('tr')
        let tdMarca = document.createElement('td')
        tdMarca.textContent = "Marca"
        let tdDatoMarca = document.createElement('td')
        tdDatoMarca.textContent = equipo.marca
        this.tbodyConsulta.appendChild(trMarca)

        trMarca.appendChild(tdMarca)
        trMarca.appendChild(tdDatoMarca)

        let trMonitor = document.createElement('tr')
        let tdMonitor = document.createElement('td')
        tdMonitor.textContent = "Monitor"
        let tdDatoMonitor = document.createElement('td')
        tdDatoMonitor.textContent = equipo.monitor
        this.tbodyConsulta.appendChild(trMonitor)

        trMonitor.appendChild(tdMonitor)
        trMonitor.appendChild(tdDatoMonitor)

        let trRam = document.createElement('tr')
        let tdRam = document.createElement('td')
        tdRam.textContent = "Ram"
        let tdDatoRam = document.createElement('td')
        tdDatoRam.textContent = equipo.ram
        this.tbodyConsulta.appendChild(trRam)

        trRam.appendChild(tdRam)
        trRam.appendChild(tdDatoRam)

        let trDiscoDuro = document.createElement('tr')
        let tdDiscoDuro = document.createElement('td')
        tdDiscoDuro.textContent = "DiscoDuro"
        let tdDatoDiscoDuro = document.createElement('td')
        tdDatoDiscoDuro.textContent = equipo.discoDuro
        this.tbodyConsulta.appendChild(trDiscoDuro)

        trDiscoDuro.appendChild(tdDiscoDuro)
        trDiscoDuro.appendChild(tdDatoDiscoDuro)

        let trProcesador = document.createElement('tr')
        let tdProcesador = document.createElement('td')
        tdProcesador.textContent = "Procesador"
        let tdDatoProcesador = document.createElement('td')
        tdDatoProcesador.textContent = equipo.procesador
        this.tbodyConsulta.appendChild(trProcesador)

        trProcesador.appendChild(tdProcesador)
        trProcesador.appendChild(tdDatoProcesador)

         let trUbicacion = document.createElement('tr')
        let tdUbicacion = document.createElement('td')
        tdUbicacion.textContent = "Ubicacion"
        let tdDatoUbicacion = document.createElement('td')
        tdDatoUbicacion.textContent = equipo.ubicacion
        this.tbodyConsulta.appendChild(trUbicacion)

        trUbicacion.appendChild(tdUbicacion)
        trUbicacion.appendChild(tdDatoUbicacion)

        let trGrafica = document.createElement('tr')
        let tdGrafica = document.createElement('td')
        tdGrafica.textContent = "Grafica"
        let tdDatoGrafica = document.createElement('td')
        tdDatoGrafica.textContent = equipo.grafica
        this.tbodyConsulta.appendChild(trGrafica)

        trGrafica.appendChild(tdGrafica)
        trGrafica.appendChild(tdDatoGrafica)

        let trFechaCompra = document.createElement('tr')
        let tdFechaCompra = document.createElement('td')
        tdFechaCompra.textContent = "FechaCompra"
        let tdDatoFechaCompra = document.createElement('td')
        tdDatoFechaCompra.textContent = equipo.fechaCompra
        this.tbodyConsulta.appendChild(trFechaCompra)

        trFechaCompra.appendChild(tdFechaCompra)
        trFechaCompra.appendChild(tdDatoFechaCompra)
 

        let trObservaciones = document.createElement('tr')
        let tdObservaciones = document.createElement('td')
        tdObservaciones.textContent = "Observaciones"
        let tdDatoObservaciones = document.createElement('td')
        tdDatoObservaciones.textContent = equipo.observaciones
        this.tbodyConsulta.appendChild(trObservaciones)

        trObservaciones.appendChild(tdObservaciones)
        trObservaciones.appendChild(tdDatoObservaciones)
    
        let trValorEconomico = document.createElement('tr')
        let tdValorEconomico = document.createElement('td')
        tdValorEconomico.textContent = "ValorEconomico"
        let tdDatoValorEconomico = document.createElement('td')
        tdDatoValorEconomico.textContent = equipo.valorEquipo
        this.tbodyConsulta.appendChild(trValorEconomico)

        trValorEconomico.appendChild(tdValorEconomico)
        trValorEconomico.appendChild(tdDatoValorEconomico)

        for(const mant of mantenimiento){
       
            console.log(mant)
            console.log("fin de un mantenimiento")
        }

        /*consultar(equipoConMantenimiento) {
            const equipo = equipoConMantenimiento.equipo;
            const mantenimiento = equipoConMantenimiento.mantenimientos;
        
            this.mostrarOcultarCrud(false, false, false, true);
            this.theadConsulta.innerHTML = '';
            this.tbodyConsulta.innerHTML = '';
        
            // Función para agregar una fila a la tabla de consulta
            const agregarFila = (nombreCampo, valorCampo) => {
                const tr = document.createElement('tr');
                const tdNombre = document.createElement('td');
                const tdValor = document.createElement('td');
        
                tdNombre.textContent = nombreCampo;
                tdValor.textContent = valorCampo;
        
                tr.appendChild(tdNombre);
                tr.appendChild(tdValor);
        
                this.tbodyConsulta.appendChild(tr);
            };
        
            // Agregar filas para cada atributo del equipo
            agregarFila('Equipo Codigo', equipo.codigoEquipo);
            agregarFila('Proveedor', equipo.proveedor);
            agregarFila('Marca', equipo.marca);
            agregarFila('Monitor', equipo.monitor);
            agregarFila('RAM', equipo.ram);
            agregarFila('Disco Duro', equipo.discoDuro);
            agregarFila('Procesador', equipo.procesador);
            agregarFila('Ubicación', equipo.ubicacion);
            agregarFila('Gráfica', equipo.grafica);
            agregarFila('Fecha de Compra', equipo.fechaCompra);
            agregarFila('Observaciones', equipo.observaciones);
            agregarFila('Valor Económico', equipo.valorEquipo);
        
            // Iterar sobre los mantenimientos y hacer algo con ellos (aquí puedes agregar lógica para mostrarlos en la tabla)
            mantenimiento.forEach(mant => {
                console.log(mant);
                console.log("fin de un mantenimiento");
            });*/
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