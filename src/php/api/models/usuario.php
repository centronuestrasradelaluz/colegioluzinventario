<?php
    /**
     * Modelo de Usuario.
     */
    class Usuario {
        public $id = null;
        public $nombre = null;
        public $correo = null;
        public $clave = null;
        public $estado = null;
        public $rol = null;
        public $tsConexion = null; // Timestamp de conexión
        public $autorizacion = null;
    }
?>