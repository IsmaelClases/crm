<?php

require_once('interfaces/crud.php');
require_once('../conn.php');

class Grupo extends Conexion implements crud {

    public $status = false;
    public $message = NULL;
    public $data = NULL;
    const ROUTE = 'grupos';

    function __construct (){
        parent::__construct();
   }


    public function get() {

            $sql = $this->conexion->prepare("SELECT * FROM sgi_grupos_menu order by orden");
            $exito = $sql->execute();
            if ($exito){
                $this->status = true;
                $this->data = $sql->fetchAll(PDO::FETCH_ASSOC);
            }

            $this->closeConnection();
    }

    public function create($data) {
        $grupo = $data['grupo'];
        $orden = $data['orden'];
        $observaciones = $data['observaciones'];

        if (isset($grupo)){

            $sql = $this->conexion->prepare("INSERT INTO `sgi_grupos_menu` (grupo, orden, observaciones) 
                                VALUES (:grupo, :orden, :observaciones)");

            $sql->bindParam(":grupo", $grupo, PDO::PARAM_STR);
            $sql->bindParam(":orden", $orden, PDO::PARAM_INT);
            $sql->bindValue(":observaciones", $observaciones, PDO::PARAM_STR); 

            $resultado = $sql->execute();
            if ($resultado){
                $this->status = true;
                $this->message = ADD_GRUPO_OK;
                $this->getGrupoMenuById($this->conexion->lastInsertId());
            } else $this->message = ADD_GRUPO_KO;

            $this->closeConnection();
        } 
    }

    public function update($data) {
        $id = $data['id_grupo_menu'];
        $orden = $data['orden'];
        $observaciones = $data['observaciones'];
        $grupo = $data['grupo'];

        if (isset($id, $grupo)){

            $sql = $this->conexion->prepare("UPDATE `sgi_grupos_menu` SET
                                grupo = :grupo,
                                orden = :orden,
                                observaciones = :observaciones
                                WHERE `id_grupo_menu`=:id");

            $sql->bindParam(":grupo", $grupo, PDO::PARAM_STR);                                          
            $sql->bindParam(":id", $id, PDO::PARAM_INT);
            $sql->bindValue(":observaciones", $observaciones, PDO::PARAM_STR);
            $sql->bindValue(":orden", $orden, PDO::PARAM_INT);

            $resultado = $sql->execute();
            if ($resultado){
                $this->status = true;
                $this->message = EDIT_GRUPO_OK;
                $this->getGrupoMenuById($id);
            } else $this->message = EDIT_GRUPO_KO;

            $this->closeConnection();

        } 
    }

    public function delete($id) {

        if (isset($id)){

            $sql = $this->conexion->prepare("DELETE FROM `sgi_grupos_menu` 
                                WHERE `id_grupo_menu`=:id_grupo_menu");
                                
            $sql->bindParam(":id_grupo_menu", $id, PDO::PARAM_INT);

            $resultado = $sql->execute();
            if ($resultado){
                $this->status = true;
                $this->message = DELETE_GRUPO_OK;
                $this->data = $id;
            } else  $this->message = DELETE_GRUPO_KO;

            $this->closeConnection();

        } 
    }

    private function getGrupoMenuById($id_grupo_menu) {
        $sql = $this->conexion->prepare("SELECT * FROM sgi_grupos_menu where id_grupo_menu = :id_grupo_menu");

        $sql->bindParam(":id_grupo_menu", $id_grupo_menu, PDO::PARAM_INT);

        $exito = $sql->execute();
        if ($exito){
            $this->data = $sql->fetchAll(PDO::FETCH_ASSOC)[0];
        } 
    }
}
?>