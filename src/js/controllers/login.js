import { Rest } from "../services/rest.js";

/**
 * Controlador de login
 */
class Login {
    constructor() {
        window.onload = this.iniciar.bind(this);
        window.onerror = (error) => console.error('Error capturado. ' + error);
    }

    /**
     * Inicia el login.
     * Se llama al cargar la página.
     */
    iniciar() {
        this.form = document.getElementsByTagName('form')[0];
        this.email = document.getElementsByTagName('input')[0];
        this.clave = document.getElementsByTagName('input')[1];
        this.btnAceptar = document.getElementsByTagName('button')[0];
        this.divCargando = document.getElementById('loadingImg');
        this.divError = document.getElementById('divError');

        this.btnAceptar.addEventListener('click', this.validarFormulario.bind(this));
    }

    /**
     * Comprobar que el campo de correo y contraseña sean válidos.
     */
    validarFormulario() {
        this.form.classList.add('was-validated');

        if (this.email.checkValidity() && this.clave.checkValidity()) {
            this.btnAceptar.disabled = true;
            this.login();
        }
    }

    /**
     * Realiza el proceso de login.
     */
    login() {
        this.divCargando.style.display = 'block';

        if (this.divError.style.display == 'block')
            this.divError.style.display = 'none';

        const login = {
            usuario: this.email.value,
            clave: this.clave.value
        };

        Rest.post('login', [], login, true)
         .then(usuario => {
             this.btnAceptar.disabled = false;
             this.divCargando.style.display = 'none';
             sessionStorage.setItem('usuario', JSON.stringify(usuario));

             this.redireccionar()
         })
         .catch(e => {
             this.btnAceptar.disabled = false;
             this.divCargando.style.display = 'none';
             this.error(e);
         })
    }

    redireccionar(){
        let usuario = JSON.parse(sessionStorage.getItem('usuario'));

        // administración - técnico
        if (usuario.rol == 'adm') {
            window.location.href = 'index.html';        
        }
        // PAS o profesores
        else if (usuario.rol == 'pro') {
            window.location.href = 'index_profesionales.html';   
        }
    }

    /**
     * Aviso de errores al usuario.
     * @param {Object} e Error.
     */
    error(e) {
        if (e != null) {
            if (e == 'Error: 401 - Unauthorized') {
                this.divError.innerHTML = '<p>Los datos introducidos no son correctos.</p>';
            }
            else if (e == 'Error: 408 - Request Timeout') {
                this.divError.innerHTML = '<p>No hay conexión con la base de datos. Intente de nuevo más tarde.</p>';
            }
            else {
                this.divError.innerHTML = '<p>' + e + '</p>';
            }

            this.divError.style.display = 'block';
            this.form.classList.remove('was-validated');
            window.scrollTo(0, document.body.scrollHeight);
        }
        else {
            this.divError.style.display = 'none';
        }
    }
}

new Login();