<?php

require_once('interfaces/crud.php');
require_once('../conn.php');

class Rol extends Conexion implements crud {

    public $status = false;
    public $message = NULL;
    public $data = NULL;
    const ROUTE = 'roles';

    function __construct (){
        parent::__construct();
   }

   public function get() {

    $sql = $this->conexion->prepare("SELECT * FROM sgi_roles order by rol");
    $exito = $sql->execute();
    if ($exito){
        $this->data = $sql->fetchAll(PDO::FETCH_ASSOC);
        $this->status = true;
    }

    $this->closeConnection();

   }

   public function create($data) {
    
    $rol = $data['rol'];
    $observaciones = $data['observaciones'];
    
    if (isset($rol)) {
    
        $sql = $this->conexion->prepare("INSERT INTO `sgi_roles` (rol,observaciones) VALUES (:rol, :observaciones)");
    
        $sql->bindParam(":rol", $rol, PDO::PARAM_STR);
        $sql->bindParam(":observaciones", $observaciones, PDO::PARAM_STR);
        
        $resultado = $sql->execute();
        if ($resultado){
            $this->status = true;
            $this->message = ADD_ROL_OK;
            $this->getRolById($this->conexion->lastInsertId());
        } else $this->message = ADD_ROL_KO;
    
        $this->closeConnection();
    } 
   }

   public function update($data) {
    
    $id = $data['id_rol'];
    $rol = $data['rol'];
    $observaciones = $data['observaciones'];
    
    
    if (isset($id, $rol)) {
    
        $sql = $this->conexion->prepare("UPDATE `sgi_roles` SET
                              rol = :rol,
                              observaciones = :observaciones
                              WHERE `id_rol`=:id and rol !='Superadmin'");
    
        $sql->bindParam(":rol", $rol, PDO::PARAM_STR);                    
        $sql->bindParam(":id", $id, PDO::PARAM_INT);                 
        $sql->bindValue(":observaciones", $observaciones, PDO::PARAM_STR);
        
        $resultado = $sql->execute();
        if ($resultado){
            $this->status = true;
            $this->message = EDIT_ROL_OK;
            $this->getRolById($id);
        } else $this->message = EDIT_ROL_KO;
    
        $this->closeConnection();
    }
   }

    public function delete($id) {
        try {
            if (isset($id)) {
        
                $sql = $this->conexion->prepare("DELETE FROM `sgi_roles` 
                                    WHERE `id_rol`=:id_rol and rol !='Superadmin'");
                                    
                $sql->bindParam(":id_rol", $id, PDO::PARAM_INT);
            
                $resultado = $sql->execute();
                if ($resultado){
                    $this->status = true;
                    $this->message = DELETE_ROL_OK;
                    $this->data = $id;
                } else $this->message = DELETE_ROL_KO;
            
                $this->closeConnection();
            
            }
        } catch (Exception $error){
            $usuario = getUsuario();
            $this->conexion->generateLog(2, $error, $usuario);
        }
    }

    private function getUsuario() {
        $authorization = new Authorization();
        $idUsuario = $authorization->comprobarToken();
        $sql = $this->conexion->prepare("SELECT * FROM sgi_usuarios where id_usuario = $idUsuario");
        $exito = $sql->execute();
        if ($exito){
            $usuario = $sql->fetchAll(PDO::FETCH_ASSOC)['usuario'];
        }
        return $usuario;
    }

    private function getRolById($id_rol) {
        $sql = $this->conexion->prepare("SELECT * FROM sgi_roles where id_rol = :id_rol");

        $sql->bindParam(":id_rol", $id_rol, PDO::PARAM_INT);

        $exito = $sql->execute();
        if ($exito){
            $this->data = $sql->fetchAll(PDO::FETCH_ASSOC)[0];
        } 
    }
} 

?>