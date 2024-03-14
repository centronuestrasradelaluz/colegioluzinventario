<?php
    require_once(dirname(__DIR__) . '/daos/daousuario.php');

    /**
     * Controlador de usuarios.
     */
    class Inventario {
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
               
                $equipos = DAOUsuario::obtenerEquipos($pathParams[0]);
                sleep(1);
          
            if (!$equipos) {
                header('HTTP/1.1 404 Not Found');
                die();
            }

            header('Content-type: application/json; charset=utf-8');
            header('HTTP/1.1 200 OK');
            echo json_encode($equipos);
            die();
        }

        function post($pathParams, $queryParams, $datos, $usuario) {            
             // Si no existe $usuario, es porque la autorización ha fallado.
             if (!$usuario) {
                header('HTTP/1.1 401 Unauthorized');
                die();
            }
            $resultado = DAOUsuario::altaEquipo($datos);
            if ($resultado) header('HTTP/1.1 200 OK');
            else header('HTTP/1.1 400 Bad Request 1');
            die();
        }

       /* function delete($pathParams, $queryParams, $usuario) {
            // Si no existe $usuario, es porque la autorización ha fallado.
            if (!$usuario) {
                header('HTTP/1.1 401 Unauthorized');
                die();
               
            }
          //Poner un header si no se realiza la eliminacion IMPORTANTE!!!!!!!!!!!!!!!!!!!!!!!!!!!
                DAOUsuario::eliminarEquipo($pathParams[0]);
                header('HTTP/1.1 200 OK');
            
        
            die();

       
        
        }*/
        function put($pathParams, $queryParams, $datos, $usuario){
            if (!$usuario) {
                header('HTTP/1.1 401 Unauthorized');
                die();
            }

            DAOUsuario::modificarEquipo($datos);
            header('HTTP/1.1 200 OK');
        
            die();
        }

    }
?>