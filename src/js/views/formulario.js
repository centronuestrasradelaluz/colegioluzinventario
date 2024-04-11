/**
 * Se utiliza como clase base para las demás vistas de la aplicación.
 */
export class Formulario {
   
    constructor(vista, idContenedor) {
        this.vista = vista;
        this.idContenedor = idContenedor;
        this.contenedor = document.getElementById(idContenedor);
    }

    crearFormItem(labelText, inputType, inputName, inputId, selectOptions = [], inputValue=[]) {
        const divFormItem = document.createElement('div');
        divFormItem.classList.add('formItem');
    
        let label; // Definir label fuera del bloque if
    
        if (!Array.isArray(labelText)) {
            console.log("no es array");
            label = document.createElement('label');
            label.textContent = labelText;
        }
    
        let inputElement;
    
        if (inputType === 'select') {
            inputElement = document.createElement('select');
            inputElement.classList.add('form-control');
            inputElement.name = inputName;
            inputElement.id = inputId;
    
            // Agregar opciones al select
            selectOptions.forEach(option => {
                const optionElement = document.createElement('option');
                optionElement.value = option.value;
                optionElement.textContent = option.text;
                inputElement.appendChild(optionElement);
            });
        } else if (inputType === 'textarea') {
            inputElement = document.createElement('textarea');
            inputElement.classList.add('form-control');
            inputElement.name = inputName;
            inputElement.rows = "5";
        } else if (inputType === 'radio') {
            labelText.forEach((texto, index) => {
                label = document.createElement('label');
                label.textContent = texto;
                console.log(inputValue[index])
                inputElement = document.createElement('input');
                inputElement.type = inputType;
                inputElement.name = inputName;
                inputElement.value = inputValue[index]
                label.appendChild(inputElement);
    
                divFormItem.appendChild(label);
            });
        } else {
            inputElement = document.createElement('input');
            inputElement.type = inputType;
            inputElement.classList.add('form-control');
            inputElement.name = inputName;
        }
    
        // Agregar inputElement al label si label está definido
        if (label) {
            label.appendChild(inputElement);
            divFormItem.appendChild(label);
        } else {
            divFormItem.appendChild(inputElement);
        }
    
        return divFormItem;
    }
    
    generarFormulario(items) {
          // Verificar si ya hay un formulario en el contenedor
    const formularioExistente = this.contenedor.querySelector('form');
    if (formularioExistente) {
        // Si ya hay un formulario, no hagas nada
        console.log('Ya existe un formulario en el contenedor');
        return;
    }
        const formulario = document.createElement('form');
        //formulario.method = 'post';
        formulario.classList.add('needs-validation');
        formulario.autocomplete = 'off';
        formulario.noValidate = true;
    
        items.forEach(item => {
            formulario.appendChild(this.crearFormItem(item.label, item.type, item.name, item.id, item.options, item.value));
        });
        const divFormItem = document.createElement('div');
        divFormItem.classList.add('formItem');
        // Crear y añadir el botón "Enviar"
      
        const botonEnviar = this.crearBotonAnadir();
        divFormItem.appendChild(botonEnviar)
        formulario.appendChild(divFormItem);
    
        this.contenedor.appendChild(formulario);
       
    }
    
    
    llenarSelect(options, selectId, defaultOptionText) {
       
        const selectElement = document.getElementById(selectId);
       
        selectElement.innerHTML = "";

        let defaultOption = document.createElement('option');
        defaultOption.value = "-1";
        defaultOption.textContent = defaultOptionText;
        selectElement.appendChild(defaultOption);

        for (const option of options) {

            console.log(option)
            let optionElement = document.createElement('option');
            optionElement.value = option.id;
            if(option.frase)
            optionElement.textContent = option.frase;
            if(option.codigoEquipo)
            optionElement.textContent = option.codigoEquipo;
            selectElement.appendChild(optionElement);
        }
    }
    // Método para obtener los datos del formulario
    /*obtenerDatos() {
        const inputs = this.contenedor.querySelectorAll('input, select, textarea');
        const datos = {};

        inputs.forEach(input => {
            datos[input.name] = input.value;
        });

        return datos;
    }*/
    crearBotonAnadir() {
        const boton = document.createElement('button');
        boton.id = 'aceptar';
        boton.textContent = 'Enviar';
        boton.type = 'button'
        boton.classList.add('btn', 'btn-success');
        boton.addEventListener('click', this.vista.ingresarDatos.bind(this.vista));
        return boton;
    }
   /* getValue(fieldName) {
        const input = this.contenedor.querySelector(`[name="${fieldName}"]`);
        if (input) {
            console.log(input.value)
            return input.value;
        } else {
            console.error(`No se pudo encontrar el campo con el nombre '${fieldName}' en el formulario.`);
            return null;
        }
    }*/
    getValue(fieldName) {
        // Verificar si es un campo de radio
        const radioInputs = this.contenedor.querySelectorAll(`input[type="radio"][name="${fieldName}"]:checked`);
        if (radioInputs.length > 0) {
            // Si hay un radio button seleccionado, devolver su valor
            console.log(radioInputs[0].value);
            return radioInputs[0].value;
        } else {
            // Si no es un campo de radio, intentar obtener el valor de otros tipos de input
            const input = this.contenedor.querySelector(`[name="${fieldName}"]`);
            if (input) {
                // Si se encuentra un input con el nombre especificado, devolver su valor
                console.log(input.value);
                return input.value;
            } else {
                // Si no se encuentra ningún campo con el nombre especificado, mostrar un error
                console.error(`No se pudo encontrar un campo con el nombre '${fieldName}' en el formulario.`);
                return null;
            }
        }
    }
    
    setValue(fieldName, value) {
        const input = this.contenedor.querySelector(`[name="${fieldName}"]`);
        if (input) {
            input.value = value;
        } else {
            console.error(`No se pudo encontrar el campo con el nombre '${fieldName}' en el formulario.`);
        }
    }

    ocultarFormItem(inputName) {
        const input = this.contenedor.querySelector(`[name="${inputName}"]`);
        if (input) {
            input.closest('.formItem').style.display = 'none';
        } else {
            console.error(`No se pudo encontrar el campo con el nombre '${inputName}' en el formulario.`);
        }
    }
    
    
}
