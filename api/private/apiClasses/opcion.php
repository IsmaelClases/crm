<?php

require_once('interfaces/crud.php');
require_once('../conn.php');

class Opcion extends Conexion implements crud {

    public $status = false;
    public $message = NULL;
    public $data = NULL;
    const ROUTE = 'opciones';

    function __construct (){
        parent::__construct();
   }

   public function get() {
    
        $sql = $this->conexion->prepare("SELECT id_opcion_menu, opcion, accion, IFNULL(texto_tooltip, '') AS texto_tooltip, observaciones FROM sgi_opciones_menu order by opcion");
        $exito = $sql->execute();
        if ($exito){
            $this->status = true;
            $this->data = $sql->fetchAll(PDO::FETCH_ASSOC);
        }
    
        $this->closeConnection();
    
   }

   public function create($data) {

    $opcion = $data['opcion'];
    $accion = $data['accion'];
    $texto_tooltip = $data['texto_tooltip'];
    $observaciones = $data['observaciones'];
    
    if (isset($opcion, $accion)){
    
        $sql = $this->conexion->prepare("INSERT INTO `sgi_opciones_menu` (opcion,accion,texto_tooltip,observaciones) 
                              VALUES (:opcion, :accion, :texto_tooltip, :observaciones)");
    
        $sql->bindParam(":opcion", $opcion, PDO::PARAM_STR);
        $sql->bindParam(":accion", $accion, PDO::PARAM_STR);
        $sql->bindParam(":texto_tooltip", $texto_tooltip, PDO::PARAM_STR);
        $sql->bindParam(":observaciones", $observaciones, PDO::PARAM_STR);
        
        $resultado = $sql->execute();
        if ($resultado){
            $this->status = true;
            $this->message = ADD_OPCION_OK;
            $this->getOpcionMenuById($this->conexion->lastInsertId());
        } else $this->message = ADD_OPCION_KO;
    
        $this->closeConnection();
    
    }
   }

   public function update($data) {

        $id = $data['id_opcion_menu'];
        $opcion = $data['opcion'];
        $accion = $data['accion'];
        $texto_tooltip = $data['texto_tooltip'];
        $observaciones = $data['observaciones'];
        
        if (isset($opcion, $accion)){
        
            $sql = $this->conexion->prepare("UPDATE `sgi_opciones_menu` SET
                                opcion = :opcion,
                                accion = :accion,
                                texto_tooltip = :texto_tooltip,
                                observaciones = :observaciones
                                WHERE `id_opcion_menu`=:id");
        
            $sql->bindParam(":opcion", $opcion, PDO::PARAM_STR);
            $sql->bindParam(":accion", $accion, PDO::PARAM_STR);                                   
            $sql->bindParam(":id", $id, PDO::PARAM_INT);
            $sql->bindParam(":texto_tooltip", $texto_tooltip, PDO::PARAM_STR);
            $sql->bindValue(":observaciones", $observaciones, PDO::PARAM_STR);
            
            $resultado = $sql->execute();
            if ($resultado){
                $this->status = true;
                $this->message = EDIT_OPCION_OK;
                $this->getOpcionMenuById($id);
            } else $this->message = EDIT_OPCION_KO;
        
            $this->closeConnection();
        
        } 
   }

   public function delete($id) {

    if (isset($id)){

        $sql = $this->conexion->prepare("DELETE FROM `sgi_opciones_menu` 
                            WHERE `id_opcion_menu`= :id_opcion_menu");
                            
        $sql->bindParam(":id_opcion_menu", $id, PDO::PARAM_INT);

        $resultado = $sql->execute();
        if ($resultado){
            $this->status = true;
            $this->message = DELETE_OPCION_OK;
            $this->data = $id;
        } else $this->message = DELETE_OPCION_KO;

        $this->closeConnection();

    }
   }

   private function getOpcionMenuById($id_opcion_menu) {
        $sql = $this->conexion->prepare("SELECT id_opcion_menu, opcion, accion, IFNULL(texto_tooltip, '') AS texto_tooltip, observaciones FROM sgi_opciones_menu where id_opcion_menu = :id_opcion_menu");

        $sql->bindParam(":id_opcion_menu", $id_opcion_menu, PDO::PARAM_INT);

        $exito = $sql->execute();
        if ($exito){
            $this->data = $sql->fetchAll(PDO::FETCH_ASSOC)[0];
        } 
    }
}