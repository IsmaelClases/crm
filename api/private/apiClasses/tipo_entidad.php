<?php

require_once('interfaces/crud.php');
require_once('../conn.php');

class TipoEntidad extends Conexion implements crud {

    public $status = false;
    public $message = NULL;
    public $data = NULL;
    const ROUTE = 'tipo-entidad';

    function __construct (){
        parent::__construct();
    }

    public function get() {
        $order = " ORDER BY tipo_entidad ";

        $sql = $this->conexion->prepare("SELECT * FROM sgi_tipos_entidad".$order);

        $exito = $sql->execute();

        if($exito) {
            $this->status = true;
            $this->data =  $sql->fetchAll(PDO::FETCH_ASSOC);
        }

        $this->closeConnection();

    }

    public function create($data) {
        $tipoEntidad = $data['tipo_entidad'];
        $observaciones = $data['observaciones'];

        if (isset($tipoEntidad)) {
            $sql = $this->conexion->prepare("INSERT INTO sgi_tipos_entidad (tipo_entidad, observaciones)
                    VALUES (:tipoEntidad, :observaciones)");
            $sql->bindParam(":tipoEntidad", $tipoEntidad, PDO::PARAM_STR);
            $sql->bindParam(":observaciones", $observaciones, PDO::PARAM_STR);

            $resultado = $sql->execute();
            if ($resultado) {
                $this->status = true;
                $this->message = ADD_TIPO_ENTIDAD_OK;
            } else {$this->message = ADD_TIPO_ENTIDAD_KO;}

            $this->closeConnection();
        }
    }

    public function update($data) {
        $idTipoEntidad = $data['id_tipo_entidad'];
        $tipoEntidad = $data['tipo_entidad'];
        $observaciones = $data['observaciones'];

        if (isset($tipoEntidad)) {
            $sql = $this->conexion->prepare("UPDATE sgi_tipos_entidad SET
                    tipo_entidad = :tipoEntidad,
                    observaciones = :observaciones
                    WHERE id_tipo_entidad = :idTipoEntidad");
            
            $sql->bindParam(":tipoEntidad", $tipoEntidad, PDO::PARAM_STR);
            $sql->bindParam(":observaciones", $observaciones, PDO::PARAM_STR);
            $sql->bindParam(":idTipoEntidad", $idTipoEntidad, PDO::PARAM_INT);

            $resultado = $sql->execute();
            if ($resultado) {
                $this->status = true;
                $this->message = EDIT_TIPO_ENTIDAD_OK;
            } else { $this->message = EDIT_TIPO_ENTIDAD_KO; }

            $this->closeConnection();
        }
    }

    public function delete($idTipoEntidad) {
        if (isset($idTipoEntidad)) {
            try {
                $sql = $this->conexion->prepare("DELETE FROM sgi_tipos_entidad WHERE id_tipo_entidad = :idTipoEntidad");
                $sql->bindParam(":idTipoEntidad", $idTipoEntidad, PDO::PARAM_INT);

                $resultado = $sql->execute();
                if ($resultado) {
                    $this->status = true;
                    $this->message = DELETE_TIPO_ENTIDAD_OK;
                    $this->data = $idTipoEntidad;
                } else { $this->message = DELETE_TIPO_ENTIDAD_KO; }
            } catch(PDOException $e) {
                if ($e->getCode() == '23000'){
                    $this->message = CONSTRAINT_TIPO_ENTIDAD;
                }
            }
            $this->closeConnection();
        }
    }

}

?>