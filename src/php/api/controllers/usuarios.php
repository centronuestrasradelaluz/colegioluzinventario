<?php
    require_once(dirname(__DIR__) . '/daos/daousuario.php');

    /**
     * Controlador de usuarios.
     */
    class Usuarios {
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
         
                
                $usuarios = DAOUsuario::obtenerUsuarios($pathParams[0]);
                sleep(1);
          
       

            if (!$usuarios) {
                header('HTTP/1.1 404 Not Found');
                die();
            }

            header('Content-type: application/json; charset=utf-8');
            header('HTTP/1.1 200 OK');
            echo json_encode($usuarios);
            die();
        }

        function post($pathParams, $queryParams, $datos, $usuario) {            
             // Si no existe $usuario, es porque la autorización ha fallado.
             if (!$usuario) {
                header('HTTP/1.1 401 Unauthorized');
                die();
            }
            $resultado = DAOUsuario::altaUsuario($datos);
            if ($resultado) header('HTTP/1.1 200 OK');
            else header('HTTP/1.1 400 Bad Request 1');
            die();
        }

        function delete($pathParams, $queryParams, $usuario) {
            // Si no existe $usuario, es porque la autorización ha fallado.
            if (!$usuario) {
                header('HTTP/1.1 401 Unauthorized');
                die();
               
            }
          //Poner un header si no se realiza la eliminacion IMPORTANTE!!!!!!!!!!!!!!!!!!!!!!!!!!!
                DAOUsuario::eliminarUsuario($pathParams[0]);
                header('HTTP/1.1 200 OK');
            
        
            die();

       
        
        }
        function put($pathParams, $queryParams, $datos, $usuario){
            if (!$usuario) {
                header('HTTP/1.1 401 Unauthorized');
                die();
            }

            DAOUsuario::modificarUsuario($datos);
            header('HTTP/1.1 200 OK');
        
            die();
        }

    }
?>