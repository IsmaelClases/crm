<?php

require_once('interfaces/crud.php');
require_once('../conn.php');

class RolMenu extends Conexion implements crud {

    public $status = false;
    public $message = NULL;
    public $data = NULL;
    const ROUTE = 'roles-menu';

    function __construct (){
        parent::__construct();
   }

   public function get() {

        $sql = $this->conexion->prepare("SELECT * FROM sgi_vista_rol_menu");
        $exito = $sql->execute();
        if ($exito){
            $this->status = true;
            $this->data = $sql->fetchAll(PDO::FETCH_ASSOC);
        }

        $this->closeConnection();
   }

   public function create($data) {

    $id_rol = $data['id_rol'];
    $id_opcion = $data['id_opcion'];
    $id_grupo = $data['id_grupo'];
    $add = $data['add'];
    $edit = $data['edit'];
    $delete = $data['delete'];
    $observaciones = $data['observaciones'];
    
    if (isset($id_rol, $id_opcion, $id_grupo)){
    
        $sql = $this->conexion->prepare("INSERT INTO `sgi_rol_menu` (id_opcion_menu, id_grupo_menu, id_rol, permiso_post, permiso_put, permiso_delete, observaciones) 
                              VALUES (:id_opcion, :id_grupo, :id_rol, :permiso_post, :permiso_put, :permiso_delete, :observaciones)");
    
        $sql->bindParam(":id_opcion", $id_opcion, PDO::PARAM_INT);
        $sql->bindParam(":id_grupo", $id_grupo, PDO::PARAM_INT);
        $sql->bindParam(":id_rol", $id_rol, PDO::PARAM_INT);
        $sql->bindParam(":permiso_post", $add, PDO::PARAM_INT);
        $sql->bindParam(":permiso_put", $edit, PDO::PARAM_INT);
        $sql->bindParam(":permiso_delete", $delete, PDO::PARAM_INT);
        $sql->bindValue(":observaciones", $observaciones, PDO::PARAM_STR);
    
        $resultado = $sql->execute();
        if ($resultado){
            $this->status = true;
            $this->message = ADD_ROL_MENU_OK;
            $this->getRolMenuById($this->conexion->lastInsertId());
        } else $this->message = ADD_ROL_MENU_KO;
    
        $this->closeConnection();
    
    } 
   }

   public function update($data) {

        $id_rol_menu = $data['id_rol_menu'];
        $id_rol = $data['id_rol'];
        $id_opcion = $data['id_opcion'];
        $id_grupo = $data['id_grupo'];
        $add = $data['add'];
        $edit = $data['edit'];
        $delete = $data['delete'];
        $observaciones = $data['observaciones'];
        
        if (isset($id_rol, $id_opcion, $id_grupo)){
        
            $sql = $this->conexion->prepare("UPDATE `sgi_rol_menu` SET
                                id_opcion_menu = :id_opcion_menu,
                                id_grupo_menu = :id_grupo_menu,
                                id_rol = :id_rol,
                                permiso_post = :permiso_post,
                                permiso_put = :permiso_put,
                                permiso_delete = :permiso_delete,
                                observaciones = :observaciones
                                WHERE `id_rol_menu`=:id_rol_menu");
        
            $sql->bindParam(":id_opcion_menu", $id_opcion, PDO::PARAM_INT);                      
            $sql->bindParam(":id_grupo_menu", $id_grupo, PDO::PARAM_INT);  
            $sql->bindParam(":id_rol", $id_rol, PDO::PARAM_INT);  
            $sql->bindParam(":id_rol_menu", $id_rol_menu, PDO::PARAM_INT); 
            $sql->bindParam(":permiso_post", $add, PDO::PARAM_INT);
            $sql->bindParam(":permiso_put", $edit, PDO::PARAM_INT);
            $sql->bindParam(":permiso_delete", $delete, PDO::PARAM_INT); 
            $sql->bindValue(":observaciones", $observaciones, PDO::PARAM_STR);  
        
            $resultado = $sql->execute();
            if ($resultado){
                $this->status = true;
                $this->message = EDIT_ROL_MENU_OK;
                $this->getRolMenuById($id_rol_menu);
            } else $this->message = EDIT_ROL_MENU_KO;
        
            $this->closeConnection();
        
        } 
   }

   public function delete($id) {

        if (isset($id)){
        
            $sql = $this->conexion->prepare("DELETE FROM `sgi_rol_menu` 
                                WHERE `id_rol_menu`=:id_rol_menu");
                                
            $sql->bindParam(":id_rol_menu", $id, PDO::PARAM_INT);
        
            $resultado = $sql->execute();
            if ($resultado){
                $this->status = true;
                $this->message = DELETE_ROL_MENU_OK;
                $this->data = $id;
            } else $this->message = DELETE_ROL_MENU_KO;
        
            $this->closeConnection();
        } 
   }

   private function getRolMenuById($id_rol_menu) {
    $sql = $this->conexion->prepare("SELECT * FROM sgi_vista_rol_menu where id_rol_menu = :id_rol_menu");

    $sql->bindParam(":id_rol_menu", $id_rol_menu, PDO::PARAM_INT);

    $exito = $sql->execute();
    if ($exito){
        $this->data = $sql->fetchAll(PDO::FETCH_ASSOC)[0];
    } 
}

}

?>