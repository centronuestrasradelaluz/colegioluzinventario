import { Vista } from '../vista.js';

/**
 * Contiene la vista del inicio
 */
export class VistaInicio extends Vista {
    /**
	 *	Constructor de la clase.
	 *	@param {ControladorPadres} controlador Controlador de la vista.
	 *	@param {HTMLDivElement} div Div de HTML en el que se desplegará la vista.
	 */
    constructor(controlador, div) {
        super(controlador, div);

        this.divBienvenida = this.div.querySelector('#divBienvenida');
        
    }

    bienvenida(datos){
        this.divBienvenida.innerHTML = "Bienvenido "+ datos.nombre
    }



    mostrar(ver) {
        super.mostrar(ver);
    }
}