<?php

require_once('interfaces/crud.php');
require_once('../conn.php');

class Usuario extends Conexion implements crud {

    public $status = false;
    public $message = NULL;
    public $data = NULL;

    const ROUTE = 'usuarios';
    const ROUTE_PROFILE = 'profile';

    function __construct (){
        parent::__construct();
    }

    public function get() {
        try{
            $sql = $this->conexion->prepare("SELECT u.id_usuario, u.usuario, u.id_rol, p.rol, u.observaciones, u.nombre_publico, u.habilitado 
            FROM sgi_usuarios u INNER JOIN sgi_roles p USING(id_rol) ORDER BY u.id_usuario ASC");
            $exito = $sql->execute();
            if ($exito){
                $this->status = true;
                $this->data = $sql->fetchAll(PDO::FETCH_ASSOC);
            }
        } catch(PDOException $error){
            $this->message = $error;
        }
        $this->closeConnection();
    }

    public function create($data) {

        $usuario = $data['usuario'];
        $password = md5($data['password']);
        $nombre_publico = $data['nombre_publico'];
        $id_rol = $data['id_rol'];
        $observaciones = $data['observaciones'];

        try {
            if (isset($usuario, $password, $id_rol)){

                $sql = $this->conexion->prepare("INSERT INTO `sgi_usuarios` (usuario, pass_user, id_rol, nombre_publico, habilitado, observaciones) 
                                    VALUES (:usuario, :password, :id_rol, :nombre_publico, 1, :observaciones)");

                $sql->bindParam(":usuario", $usuario);
                $sql->bindParam(":password", $password);
                $sql->bindParam(":id_rol", $id_rol);
                $sql->bindParam(":nombre_publico", $nombre_publico);
                $sql->bindParam(":observaciones", $observaciones);

                $resultado = $sql->execute();
                if ($resultado){
                    $this->status = true;
                    $this->message = ADD_USER_OK;
                    $this->getUserById($this->conexion->lastInsertId());
                } else $this->message = ADD_USER_KO;
            } 
        } catch(PDOException $error) {
            //$this->conexion->generateLog(2, $error, $usuario);
            $this->message = $error;
        }
        $this->closeConnection();
    }

    public function update($data) {

        $id_usuario = $data['id_usuario'];
        $usuario = $data['usuario'];
        $observaciones = $data['observaciones'];
        $nombre_publico = $data['nombre_publico'];
        $id_rol = $data['id_rol'];
    
        $habilitado = $data['habilitado'] ? 1 : 0;
        
        if (isset($data['password']) && $data['password'] != ''){
            $password = md5($data['password']);

            $contraSQL = ", pass_user = :password ";
        } else {
            $contraSQL = "";
        }
        try{
            if (isset($id_usuario, $id_rol)){
        
                $sql = $this->conexion->prepare("UPDATE `sgi_usuarios` SET
                                    id_rol = :id_rol,
                                    usuario = :usuario,
                                    nombre_publico = :nombre_publico,
                                    habilitado = :habilitado,
                                    observaciones = :observaciones
                                    $contraSQL
                                    WHERE `id_usuario`=:id_usuario");
        
                $sql->bindParam(":id_rol", $id_rol, PDO::PARAM_INT);
                $sql->bindValue(":usuario", $usuario, PDO::PARAM_STR); 
                $sql->bindValue(":nombre_publico", $nombre_publico, PDO::PARAM_STR); 
                $sql->bindParam(":habilitado", $habilitado, PDO::PARAM_INT);
                $sql->bindValue(":observaciones", $observaciones, PDO::PARAM_STR);                     
                $sql->bindParam(":id_usuario", $id_usuario, PDO::PARAM_INT);
                if (isset($data['password']) && $data['password'] != ''){
                    $sql->bindParam(":password", $password, PDO::PARAM_STR); 
                }
        
                $resultado = $sql->execute();
                if ($resultado){
                    $this->status = true;
                    $this->message = EDIT_USER_OK;
                    $this->getUserById($id_usuario);
                } else $this->message = EDIT_USER_KO;
            } 
        } catch(PDOException $error) {
            //$this->conexion->generateLog(2, $error, $usuario);
            $this->message = $error;
        }
        $this->closeConnection();
    }

    public function updateProfile($data, $token) {
        $usuario = $data['correoUsuario'];
        $nombre_publico = $data['nombrePublico'];
        try{
            if (isset($data['nuevaPassword']) && $data['nuevaPassword'] != '' && $data['nuevaPassword'] == $data['confirmarNuevaPassword']){
                $password = md5($data['nuevaPassword']);
                $contraSQL = ", pass_user = :password ";
            } else {
                $contraSQL = "";
            }
            
            $sql = $this->conexion->prepare("UPDATE `sgi_usuarios` SET
                                    usuario = :usuario,
                                    nombre_publico = :nombre_publico
                                $contraSQL
                                WHERE `token_sesion` = :token");
        
            $sql->bindParam(":usuario", $usuario, PDO::PARAM_STR);
            $sql->bindValue(":nombre_publico", $nombre_publico, PDO::PARAM_STR);                     
            $sql->bindParam(":token", $token, PDO::PARAM_STR);
            if (isset($data['nuevaPassword']) && $data['nuevaPassword'] != '' && $data['nuevaPassword'] == $data['confirmarNuevaPassword']){
                $sql->bindParam(":password", $password, PDO::PARAM_STR); 
            }
        
            $resultado = $sql->execute();
            if ($resultado){
                $this->status = true;
                $this->message = EDIT_PERFIL_OK;
                
            } else $this->message = EDIT_PERFIL_KO;
        } catch(PDOException $error) {
            $this->conexion->generateLog(2, $error, $usuario);
            $this->message = $error;
        }
        $this->closeConnection();
    }

    public function delete($id) {

        if (isset($id)){
            try {
                $sql = $this->conexion->prepare("DELETE FROM `sgi_usuarios` WHERE `id_usuario`=:id");
                                
                $sql->bindParam(":id", $id, PDO::PARAM_STR);
            
                $resultado = $sql->execute();
                if ($resultado){
                    $this->status = true;
                    $this->message = DELETE_USER_OK;
                    $this->data = $id;
                } else  $this->message = DELETE_USER_KO;
            } catch(PDOException $error) {
                //$this->conexion->generateLog(2, $error, $usuario);
                $this->message = $error;
            }
            $this->closeConnection();
        }
    }

    private function getUserById($id_usuario) {
        try {
            $sql = $this->conexion->prepare("SELECT u.id_usuario, u.usuario, u.id_rol, p.rol, u.observaciones, u.nombre_publico, u.habilitado 
            FROM sgi_usuarios u INNER JOIN sgi_roles p USING(id_rol) where id_usuario = :id_usuario");

            $sql->bindParam(":id_usuario", $id_usuario, PDO::PARAM_INT);

            $exito = $sql->execute();
            if ($exito){
                $this->data = $sql->fetchAll(PDO::FETCH_ASSOC)[0];
            }
        } catch(PDOException $error) {
            //$this->conexion->generateLog(2, $error, $usuario);
            $this->message = $error;
        } 
    }
}

?>