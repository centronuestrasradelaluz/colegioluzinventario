<?php
    require_once(dirname(__DIR__) . '/daos/daousuario.php');

    /**
     * Controlador de usuarios.
     */
    class Seleccionados {
        /**
         * Sacar los cursos.
         * @param array $pathParams No utilizado.
         * @param array $queryParams No utilizado.
         * @param object $usuario Usuario que realiza el proceso.
         */
        function get($pathParams, $queryParams, $usuario) {
           
            // Si no existe $usuario, es porque la autorización ha fallado.
            if (!$usuario) {
            header('HTTP/1.1 401 Unauthorized');
                die();
            }

             if (count($queryParams) && isset($queryParams['pantalla'])) {
          
                
                    $seleccionados = DAOUsuario::obtenerSeleccionados($queryParams['pantalla']);
                    sleep(1);
              
            }
        else {
            header('HTTP/1.1 400 Bad Request');
            die();
        }
               
              
          
            if (!$seleccionados) {
                header('HTTP/1.1 404 Not Found');
                die();
            }

            header('Content-type: application/json; charset=utf-8');
            header('HTTP/1.1 200 OK');
            echo json_encode($seleccionados);
            die();
        }

       

      

    }
?>