<?php
    require_once(dirname(__DIR__) . '/models/usuario.php');

    /**
     * DAO de Usuario.
     * Objeto para el acceso a los datos relacionados con usuarios.
     */
    class DAOUsuario {
        /**
         * Consulta la base de datos para autenticar al usuario y devolver sus datos.
         * @param object $login Login Modelo de login.
         * @return object|boolean Devuelve los datos del usuario o false si no existe el usuario. 
         */
        public static function autenticarLogin($login) {
            if (!BD::iniciarTransaccion())
                throw new Exception('No es posible iniciar la transacción.');

          /*  $sql = 'SELECT id, correo, contrasenia FROM Usuario';
            $sql .= ' WHERE correo=:correo';
            $params = array('correo' => $login->usuario);
            $persona = BD::seleccionar($sql, $params);

            // Chequear si existe o no alguien con ese correo.
            if (!$persona) {
                if (!BD::commit()) throw new Exception('No se pudo confirmar la transacción.');
                else return false;
            }*/
            
            $sql = 'SELECT * FROM Usuario';
            $sql .= ' WHERE correo = :usuario';
            $params = array('usuario' => $login->usuario);
            $resultado = BD::seleccionar($sql, $params);
           
            if (!$resultado) {
                if (!BD::commit()) throw new Exception('No se pudo confirmar la transacción.');
                else return false;
            }

            if (!BD::commit()) 
                throw new Exception('No se pudo confirmar la transacción.');

           /* if (password_verify($login->clave, $resultado[0]['contrasenia'])) {
                return DAOUsuario::crearUsuario($resultado);
            }*/
            if ($login->clave == $resultado[0]['contrasenia']){
                return DAOUsuario::crearUsuario($resultado);
            }
            else {
                return false;
            }
        }

        /**
         * Genera un objeto de tipo usuario.
         * @param array $resultSet Array de datos.
         * @return Usuario|boolean Objeto creado o False si no se pudo crear.
         */
        public static function crearUsuario($resultSet) {
            $usuario = new Usuario();
           
            if (count($resultSet) == 1) {
                $usuario->id = $resultSet[0]['id'];
                $usuario->correo = $resultSet[0]['correo'];
                $usuario->nombre = $resultSet[0]['nombre'];
                $usuario->rol = $resultSet[0]['rol'];
                $usuario->estado = $resultSet[0]['estado'];
            }
            else {
                $usuario = false;
            }

            return $usuario;
        }

        /**
         * Genera un objeto de tipo usuario.
         * @param array $resultSet Array de datos.
         * @return Usuario|boolean Objeto creado o False si no se pudo crear.
         */
        public static function obtenerUsuarios($busqueda) {
           
            if (!BD::iniciarTransaccion())
                throw new Exception('No es posible iniciar la transacción.');
           
            if($busqueda == "null"){
                $sql = 'SELECT id, nombre, correo, contrasenia, estado, rol FROM Usuario';
           
                $usuarios = BD::seleccionar($sql, null);

            }else{
               
                $sql = 'SELECT id, nombre, correo, contrasenia, estado, rol FROM Usuario';
                $sql .= ' WHERE nombre';
                $sql .= ' LIKE :busqueda';
                
                $params = array('busqueda' => '%'. $busqueda . '%');
                $usuarios = BD::seleccionar($sql, $params);
                
            }
           

            return $usuarios;
        }

         /**
         * Añade fila a tabla 'Usuario'
         * @param object $datos Datos de la Persona.
         * @return int ID de la fila insertada.
         */
        public static function altaUsuario($datos) {
            $sql = 'INSERT INTO Usuario(nombre, correo, contrasenia, rol)';
            $sql .= ' VALUES(:nombre, :correo, :contrasenia, :rol)';

          /*  if ($datos->contrasenia != null) {
               // $contrasenia = password_hash($datos->contrasenia, PASSWORD_DEFAULT, ['cost' => 15]);
            }
            else {
                $contrasenia = NULL;
            }*/

            $params = array(
                'nombre' => $datos->nombre,
                'correo' => $datos->correo,
                'contrasenia' => $datos->contrasenia,
                'rol' => $datos->rol
            );

            return BD::insertar($sql, $params);
        }

        public static function eliminarUsuario($id) {
            $sql = 'DELETE FROM Usuario';
            $sql .= ' WHERE id=:id';

            $params = array('id'=> $id);

            BD::borrar($sql, $params);
        }

        public static function modificarUsuario($datos) {
            $sql = 'UPDATE Usuario SET nombre=:nombre, correo=:correo, contrasenia=:contrasenia,';
            $sql .= ' estado=:estado, rol=:rol';
            $sql .= ' WHERE id=:id';

            $params = array(
                'id'=> $datos->id,
                'nombre'=> $datos->nombre,
                'correo'=> $datos->correo,
                'contrasenia'=> $datos->contrasenia,
                'estado'=> $datos->estado,
                'rol'=> $datos->rol
            );

           return BD::actualizar($sql,$params);
        }

        /*INVENTARIOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOoo */

        public static function obtenerSeleccionados() {
           
            if (!BD::iniciarTransaccion())
                throw new Exception('No es posible iniciar la transacción.');
           
                    $sql = 'SELECT * FROM Linea';

                    $linea = BD::seleccionar($sql, null);
       
                    $sql = 'SELECT * FROM SistemaOperativo';
       
                    $sistemaOperativo = BD::seleccionar($sql, null);
       
                    $sql = 'SELECT * FROM TipoEquipo';
       
                    $tipoEquipo = BD::seleccionar($sql, null);
          
                    $sql = 'SELECT id, codigoEquipo FROM Equipo';

                    $equipo = BD::seleccionar($sql, null);

       
                    $seleccionados = array(
                       'linea' => $linea,
                       'sistemaOperativo' => $sistemaOperativo,
                       'tipoEquipo' => $tipoEquipo,
                       'codigoEquipo' => $equipo
                   );
                   
                return $seleccionados;
          
        }

        /**
         * Genera un objeto de tipo usuario.
         * @param array $resultSet Array de datos.
         * @return Usuario|boolean Objeto creado o False si no se pudo crear.
         */
        public static function obtenerEquipos($busqueda) {
           
            if (!BD::iniciarTransaccion())
                throw new Exception('No es posible iniciar la transacción.');
           
            if($busqueda == "null"){
                $sql = 'SELECT id, codigoEquipo, proveedor, marca, monitor, ram, discoDuro, ubicacion,';
                $sql .= ' grafica, fechaCompra, observaciones, valorEquipo, idLinea, idSistemaOperativo';
                $sql .= ' FROM Equipo';
                $equipos = BD::seleccionar($sql, null);

            }else{
               
                $sql = 'SELECT id, codigoEquipo, proveedor, marca, monitor, ram, discoDuro, procesador, ubicacion,';
                $sql .= ' grafica, fechaCompra, observaciones, valorEquipo, idLinea, idTipoEquipo, idSistemaOperativo';
                $sql .= ' FROM Equipo';
                $sql .= ' WHERE codigoEquipo';
                $sql .= ' LIKE :busqueda';
                
                $params = array('busqueda' => '%'. $busqueda . '%');
                $equipos = BD::seleccionar($sql, $params);
                
            }

            $sqlMantenimientos = 'SELECT * FROM Mantenimiento';
            
            $mantenimientos = BD::seleccionar($sqlMantenimientos, null);

            $equiposConMantenimientos = array();

            foreach ($equipos as $equipo) {
                // Inicializamos un array para los mantenimientos de este equipo
                $mantenimientosDeEquipo = array();
            
                // Iteramos sobre los mantenimientos para encontrar los asociados a este equipo
                foreach ($mantenimientos as $mantenimiento) {
                    // Verificamos si el mantenimiento está asociado al equipo actual
                    if ($mantenimiento['idEquipo'] === $equipo['id']) {
                        // Agregamos el mantenimiento al array de mantenimientos de este equipo
                        $mantenimientosDeEquipo[] = $mantenimiento;
                    }
                }
                // Agregamos el equipo junto con sus mantenimientos al nuevo array
                $equiposConMantenimientos[] = array(
                    'equipo' => $equipo,
                    'mantenimientos' => $mantenimientosDeEquipo
                );
            }

            return $equiposConMantenimientos;

            //FORMA MAS CORRECTA
            /*
            public static function obtenerEquipos($busqueda) {
    if (!BD::iniciarTransaccion())
        throw new Exception('No es posible iniciar la transacción.');
    
    // Construir la consulta principal para obtener equipos y sus mantenimientos
    $sql = 'SELECT e.id, e.codigoEquipo, e.proveedor, e.marca, e.monitor, e.ram, e.discoDuro, e.ubicacion,';
    $sql .= ' e.grafica, e.fechaCompra, e.observaciones, e.valorEquipo, e.idLinea, e.idSistemaOperativo,';
    $sql .= ' m.id AS idMantenimiento, m.fecha AS fechaMantenimiento, m.descripcion AS descripcionMantenimiento';
    $sql .= ' FROM Equipo e';
    $sql .= ' LEFT JOIN Mantenimiento m ON e.id = m.idEquipo';
    if($busqueda != "null"){
        $sql .= ' WHERE e.codigoEquipo LIKE :busqueda';
        $params = array('busqueda' => '%'. $busqueda . '%');
    } else {
        $params = null;
    }
    
    // Ejecutar la consulta
    $equiposConMantenimientos = BD::seleccionar($sql, $params);
    
    // Organizar resultados en una estructura más adecuada
    $equipos = array();
    foreach ($equiposConMantenimientos as $row) {
        $idEquipo = $row['id'];
        // Si el equipo aún no está en el arreglo, agregarlo
        if (!isset($equipos[$idEquipo])) {
            $equipos[$idEquipo] = array(
                'equipo' => array(
                    'id' => $row['id'],
                    'codigoEquipo' => $row['codigoEquipo'],
                    'proveedor' => $row['proveedor'],
                    'marca' => $row['marca'],
                    'monitor' => $row['monitor'],
                    'ram' => $row['ram'],
                    'discoDuro' => $row['discoDuro'],
                    'ubicacion' => $row['ubicacion'],
                    'grafica' => $row['grafica'],
                    'fechaCompra' => $row['fechaCompra'],
                    'observaciones' => $row['observaciones'],
                    'valorEquipo' => $row['valorEquipo'],
                    'idLinea' => $row['idLinea'],
                    'idSistemaOperativo' => $row['idSistemaOperativo']
                ),
                'mantenimientos' => array()
            );
        }
        // Agregar el mantenimiento al equipo correspondiente
        if ($row['idMantenimiento'] !== null) {
            $equipos[$idEquipo]['mantenimientos'][] = array(
                'id' => $row['idMantenimiento'],
                'fecha' => $row['fechaMantenimiento'],
                'descripcion' => $row['descripcionMantenimiento']
            );
        }
    }
    
    return array_values($equipos); // Reindexar el arreglo y devolverlo
}

             */

        }

         /**
         * Añade fila a tabla 'Usuario'
         * @param object $datos Datos de la Persona.
         * @return int ID de la fila insertada.
         */
        public static function altaEquipo($datos) {
            $sql = 'INSERT INTO Equipo(codigoEquipo, proveedor, marca, monitor, ram, discoDuro, procesador, ubicacion,';
            $sql .= ' grafica, fechaCompra, observaciones, valorEquipo, idLinea, idTipoEquipo, idSistemaOperativo)';
            $sql .= ' VALUES(:codigoEquipo, :proveedor, :marca, :monitor, :ram, :discoDuro, :procesador, :ubicacion,';
            $sql .= ' :grafica, :fechaCompra, :observaciones, :valorEquipo, :idLinea, :idTipoEquipo, :idSistemaOperativo)';


            $params = array(
                'codigoEquipo'=> $datos->codigoEquipo,
                'proveedor'=> $datos->proveedor,
                'marca'=> $datos->marca,
                'monitor'=> $datos->monitor,
                'ram'=> $datos->ram,
                'discoDuro'=> $datos->discoDuro,
                'procesador'=> $datos->procesador,
                'ubicacion'=> $datos->ubicacion,
                'grafica'=> $datos->grafica,
                'fechaCompra'=> $datos->fechaCompra,
                'observaciones'=> $datos->observaciones,
                'valorEquipo'=> $datos->valorEquipo,
                'idLinea'=> $datos->idLinea,
                'idTipoEquipo'=> $datos->idTipoEquipo,
                'idSistemaOperativo'=> $datos->idSistemaOperativo
            );

            return BD::insertar($sql, $params);
        }

        public static function eliminarEquipo($id) {
            $sql = 'DELETE FROM Equipo';
            $sql .= ' WHERE id=:id';

            $params = array('id'=> $id);

            BD::borrar($sql, $params);
        }

        public static function modificarEquipo($datos) {
            $sql = 'UPDATE Equipo SET codigoEquipo=:codigoEquipo, proveedor=:proveedor, marca=:marca,';
            $sql .= ' monitor=:monitor, ram=:ram, discoDuro=:discoDuro, procesador=:procesador, ubicacion=:ubicacion, grafica=:grafica,';
            $sql .= ' fechaCompra=:fechaCompra, observaciones=:observaciones, valorEquipo=:valorEquipo,';
            $sql .= ' idLinea=:idLinea, idTipoEquipo=:idTipoEquipo, idSistemaOperativo=:idSistemaOperativo';
            $sql .= ' WHERE id=:id';

         
            $params = array(
                'id'=> $datos->id,
                'codigoEquipo'=> $datos->codigoEquipo,
                'proveedor'=> $datos->proveedor,
                'marca'=> $datos->marca,
                'monitor'=> $datos->monitor,
                'ram'=> $datos->ram,
                'discoDuro'=> $datos->discoDuro,
                'procesador'=> $datos->procesador,
                'ubicacion'=> $datos->ubicacion,
                'grafica'=> $datos->grafica,
                'fechaCompra'=> $datos->fechaCompra,
                'observaciones'=> $datos->observaciones,
                'valorEquipo'=> $datos->valorEquipo,
                'idLinea'=> $datos->idLinea,
                'idTipoEquipo'=> $datos->idTipoEquipo,
                'idSistemaOperativo'=> $datos->idSistemaOperativo
            );

           return BD::actualizar($sql,$params);
        }

        public static function obtenerMantenimientos($busqueda){

            if (!BD::iniciarTransaccion())
            throw new Exception('No es posible iniciar la transacción.');
            
            if ($busqueda == "null"){
                $sql = 'SELECT mantenimiento.id, idEquipo, idUsuario,fechaIncidencia, descripcion, fechaArreglo, nombreArregla, solucion , equipo.codigoEquipo'; 
                $sql .= ' FROM Mantenimiento';
                $sql .= ' INNER JOIN Equipo on equipo.id = mantenimiento.idequipo';

                return BD::seleccionar($sql, null);
            }
            else{
                $sql = 'SELECT mantenimiento.id, idEquipo, idUsuario,fechaIncidencia, descripcion, fechaArreglo, nombreArregla, solucion , equipo.codigoEquipo'; 
                $sql .= ' FROM Mantenimiento';
                $sql .= ' INNER JOIN Equipo on equipo.id = mantenimiento.idequipo';
                $sql .= ' WHERE equipo.codigoEquipo';
                $sql .= ' LIKE :busqueda';

                $params = array('busqueda' => '%'. $busqueda . '%');
                return BD::seleccionar($sql, $params);
            }
           
           
           
        }

        public static function altaMantenimiento($datos){


            $sql = 'INSERT INTO Mantenimiento(idEquipo, idUsuario, fechaIncidencia,descripcion)';
            $sql .= ' VALUES(:idEquipo,:idUsuario,CURDATE(),:descripcion)';


            $params = array(
                'idEquipo' => $datos->idEquipo,
                'idUsuario'=>$datos->idUsuario,
                'descripcion' =>$datos->descripcion

            );
                
            return BD::insertar($sql, $params);
        }
        

    }

       
?>