<?php

require_once('interfaces/crud.php');
require_once('../conn.php');

class UnidadDual extends Conexion implements crud {

    public $status = false;
    public $message = NULL;
    public $data = NULL;
    const ROUTE = 'unidad-dual';

    function __construct (){
        parent::__construct();
    }

    public function get() {
        $order = " ORDER BY unidad_dual ";

        $sql = $this->conexion->prepare("SELECT * FROM sgi_unidades_dual".$order);

        $exito = $sql->execute();

        if($exito) {
            $this->status = true;
            $this->data =  $sql->fetchAll(PDO::FETCH_ASSOC);
        }

        $this->closeConnection();

    }

    public function create($data) {
        $unidadDual = $data['unidad_dual'];
        $observaciones = $data['observaciones'];

        if (isset($unidadDual)) {
            $sql = $this->conexion->prepare("INSERT INTO sgi_unidades_dual (unidad_dual, observaciones)
                    VALUES (:unidadDual, :observaciones)");
            $sql->bindParam(":unidadDual", $unidadDual, PDO::PARAM_STR);
            $sql->bindParam(":observaciones", $observaciones, PDO::PARAM_STR);

            $resultado = $sql->execute();
            if ($resultado) {
                $this->status = true;
                $this->message = ADD_UNIDAD_DUAL_OK;
            } else {$this->message = ADD_UNIDAD_DUAL_KO;}

            $this->closeConnection();
        }
    }

    public function update($data) {
        $idUnidadDual = $data['id_unidad_dual'];
        $unidadDual = $data['unidad_dual'];
        $observaciones = $data['observaciones'];

        if (isset($unidadDual)) {
            $sql = $this->conexion->prepare("UPDATE sgi_unidades_dual SET
                    unidad_dual = :unidadDual,
                    observaciones = :observaciones
                    WHERE id_unidad_dual = :idUnidadDual");
            
            $sql->bindParam(":unidadDual", $unidadDual, PDO::PARAM_STR);
            $sql->bindParam(":observaciones", $observaciones, PDO::PARAM_STR);
            $sql->bindParam(":idUnidadDual", $idUnidadDual, PDO::PARAM_INT);

            $resultado = $sql->execute();
            if ($resultado) {
                $this->status = true;
                $this->message = EDIT_UNIDAD_DUAL_OK;
            } else { $this->message = EDIT_UNIDAD_DUAL_KO; }

            $this->closeConnection();
        }
    }

    public function delete($idUnidadDual) {
        if (isset($idUnidadDual)) {
            try {
                $sql = $this->conexion->prepare("DELETE FROM sgi_unidades_dual WHERE id_unidad_dual = :idUnidadDual");
                $sql->bindParam(":idUnidadDual", $idUnidadDual, PDO::PARAM_INT);

                $resultado = $sql->execute();
                if ($resultado) {
                    $this->status = true;
                    $this->message = DELETE_UNIDAD_DUAL_OK;
                    $this->data = $idUnidadDual;
                } else { $this->message = DELETE_UNIDAD_DUAL_KO; }
            } catch(PDOException $e) {
                if ($e->getCode() == '23000'){
                    $this->message = CONSTRAINT_UNIDAD_DUAL;
                }
            }
            $this->closeConnection();
        }
    }

}

?>