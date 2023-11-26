<?php

require_once('interfaces/crud.php');
require_once('../conn.php');

class Zona extends Conexion implements crud {

    public $status = false;
    public $message = NULL;
    public $data = NULL;
    const ROUTE = 'zona';

    function __construct (){
        parent::__construct();
    }

    public function get() {
        $order = " ORDER BY zona ";

        $sql = $this->conexion->prepare("SELECT * FROM sgi_zonas".$order);

        $exito = $sql->execute();

        if($exito) {
            $this->status = true;
            $this->data =  $sql->fetchAll(PDO::FETCH_ASSOC);
        }

        $this->closeConnection();

    }

    public function create($data) {
        $zona = $this->trimIfString($data['zona']);
        $observaciones = $this->trimIfString($data['observaciones']);

        if (isset($zona)) {
            $sql = $this->conexion->prepare("INSERT INTO sgi_zonas (zona, observaciones)
                    VALUES (:zona, :observaciones)");
            $sql->bindParam(":zona", $zona, PDO::PARAM_STR);
            $sql->bindParam(":observaciones", $observaciones, PDO::PARAM_STR);

            $resultado = $sql->execute();
            if ($resultado) {
                $this->status = true;
                $this->message = ADD_ZONA_OK;
            } else {$this->message = ADD_ZONA_KO;}

            $this->closeConnection();
        }
    }

    public function update($data) {
        $idZona = $data['id_zona'];
        $zona = $this->trimIfString($data['zona']);
        $observaciones = $this->trimIfString($data['observaciones']);

        if (isset($zona)) {
            $sql = $this->conexion->prepare("UPDATE sgi_zonas SET
                    zona = :zona,
                    observaciones = :observaciones
                    WHERE id_zona = :idZona");
            
            $sql->bindParam(":zona", $zona, PDO::PARAM_STR);
            $sql->bindParam(":observaciones", $observaciones, PDO::PARAM_STR);
            $sql->bindParam(":idZona", $idZona, PDO::PARAM_INT);

            $resultado = $sql->execute();
            if ($resultado) {
                $this->status = true;
                $this->message = EDIT_ZONA_OK;
            } else { $this->message = EDIT_ZONA_KO; }

            $this->closeConnection();
        }
    }

    public function delete($idZona) {
        if (isset($idZona)) {
            try {
                $sql = $this->conexion->prepare("DELETE FROM sgi_zonas WHERE id_zona = :idZona");
                $sql->bindParam(":idZona", $idZona, PDO::PARAM_INT);

                $resultado = $sql->execute();
                if ($resultado) {
                    $this->status = true;
                    $this->message = DELETE_ZONA_OK;
                    $this->data = $idZona;
                } else { $this->message = DELETE_ZONA_KO; }
            } catch(PDOException $e) {
                if ($e->getCode() == '23000'){
                    $this->message = CONSTRAINT_ZONA;
                }
            }
            $this->closeConnection();
        }
    }

}

?>