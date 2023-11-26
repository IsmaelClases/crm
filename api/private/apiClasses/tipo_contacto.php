<?php

require_once('interfaces/crud.php');
require_once('../conn.php');

class TipoContacto extends Conexion implements crud {

    public $status = false;
    public $message = NULL;
    public $data = NULL;
    const ROUTE = 'tipo-contacto';

    function __construct (){
        parent::__construct();
    }

    public function get() {

        $sql = $this->conexion->prepare("SELECT * FROM sgi_tipos_contacto");

        $exito = $sql->execute();

        if($exito) {
            $this->status = true;
            $this->data =  $sql->fetchAll(PDO::FETCH_ASSOC);
        }

        $this->closeConnection();

    }

    public function create($data) {
        $tipoContacto = $data['tipo_contacto'];
        $observaciones = $data['observaciones'];

        if (isset($tipoContacto)) {
            $sql = $this->conexion->prepare("INSERT INTO sgi_tipos_contacto (tipo_contacto, observaciones)
                    VALUES (:tipoContacto, :observaciones)");
            $sql->bindParam(":tipoContacto", $tipoContacto, PDO::PARAM_STR);
            $sql->bindParam(":observaciones", $observaciones, PDO::PARAM_STR);

            $resultado = $sql->execute();
            if ($resultado) {
                $this->status = true;
                $this->message = ADD_TIPO_CONTACTO_OK;
            } else {$this->message = ADD_TIPO_CONTACTO_KO;}

            $this->closeConnection();
        }
    }

    public function update($data) {
        $idTipoContacto = $data['id_tipo_contacto'];
        $tipoContacto = $data['tipo_contacto'];
        $observaciones = $data['observaciones'];

        if (isset($tipoContacto)) {
            $sql = $this->conexion->prepare("UPDATE sgi_tipos_contacto SET
                    tipo_contacto = :tipoContacto,
                    observaciones = :observaciones
                    WHERE id_tipo_contacto = :idTipoContacto");
            
            $sql->bindParam(":tipoContacto", $tipoContacto, PDO::PARAM_STR);
            $sql->bindParam(":observaciones", $observaciones, PDO::PARAM_STR);
            $sql->bindParam(":idTipoContacto", $idTipoContacto, PDO::PARAM_INT);

            $resultado = $sql->execute();
            if ($resultado) {
                $this->status = true;
                $this->message = EDIT_TIPO_CONTACTO_OK;
            } else { $this->message = EDIT_TIPO_CONTACTO_KO; }

            $this->closeConnection();
        }
    }

    public function delete($idTipoContacto) {
        if (isset($idTipoContacto)) {
            try {
                $sql = $this->conexion->prepare("DELETE FROM sgi_tipos_contacto WHERE id_tipo_contacto = :idTipoContacto");
                $sql->bindParam(":idTipoContacto", $idTipoContacto, PDO::PARAM_INT);

                $resultado = $sql->execute();
                if ($resultado) {
                    $this->status = true;
                    $this->message = DELETE_TIPO_CONTACTO_OK;
                    $this->data = $idTipoContacto;
                } else { $this->message = DELETE_TIPO_CONTACTO_KO; }
            } catch(PDOException $e) {
                if ($e->getCode() == '23000'){
                    $this->message = CONSTRAINT_TIPO_CONTACTO;
                }
            }
            $this->closeConnection();
        }
    }

}

?>