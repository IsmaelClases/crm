<?php

require_once('interfaces/crud.php');
require_once('../conn.php');

class MotivoReunion extends Conexion implements crud {

    public $status = false;
    public $message = NULL;
    public $data = NULL;
    const ROUTE = 'motivo-reunion';

    function __construct (){
        parent::__construct();
    }

    public function get() {
        $order = " ORDER BY motivo_reunion ";

        $sql = $this->conexion->prepare("SELECT * FROM sgi_motivos_reunion".$order);

        $exito = $sql->execute();

        if($exito) {
            $this->status = true;
            $this->data =  $sql->fetchAll(PDO::FETCH_ASSOC);
        }

        $this->closeConnection();

    }

    public function create($data) {
        $motivoReunion = $data['motivo_reunion'];
        $observaciones = $data['observaciones'];

        if (isset($motivoReunion)) {
            $sql = $this->conexion->prepare("INSERT INTO sgi_motivos_reunion (motivo_reunion, observaciones)
                    VALUES (:motivoReunion, :observaciones)");
            $sql->bindParam(":motivoReunion", $motivoReunion, PDO::PARAM_STR);
            $sql->bindParam(":observaciones", $observaciones, PDO::PARAM_STR);

            $resultado = $sql->execute();
            if ($resultado) {
                $this->status = true;
                $this->message = ADD_MOTIVO_REUNION_OK;
            } else {$this->message = ADD_MOTIVO_REUNION_KO;}

            $this->closeConnection();
        }
    }

    public function update($data) {
        $idMotivoReunion = $data['id_motivo_reunion'];
        $motivoReunion = $data['motivo_reunion'];
        $observaciones = $data['observaciones'];

        if (isset($motivoReunion)) {
            $sql = $this->conexion->prepare("UPDATE sgi_motivos_reunion SET
                    motivo_reunion = :motivoReunion,
                    observaciones = :observaciones
                    WHERE id_motivo_reunion = :idMotivoReunion");
            
            $sql->bindParam(":motivoReunion", $motivoReunion, PDO::PARAM_STR);
            $sql->bindParam(":observaciones", $observaciones, PDO::PARAM_STR);
            $sql->bindParam(":idMotivoReunion", $idMotivoReunion, PDO::PARAM_INT);

            $resultado = $sql->execute();
            if ($resultado) {
                $this->status = true;
                $this->message = EDIT_MOTIVO_REUNION_OK;
            } else { $this->message = EDIT_MOTIVO_REUNION_KO; }

            $this->closeConnection();
        }
    }

    public function delete($idMotivoReunion) {
        if (isset($idMotivoReunion)) {
            try {
                $sql = $this->conexion->prepare("DELETE FROM sgi_motivos_reunion WHERE id_motivo_reunion = :idMotivoReunion");
                $sql->bindParam(":idMotivoReunion", $idMotivoReunion, PDO::PARAM_INT);

                $resultado = $sql->execute();
                if ($resultado) {
                    $this->status = true;
                    $this->message = DELETE_MOTIVO_REUNION_OK;
                    $this->data = $idMotivoReunion;
                } else { $this->message = DELETE_MOTIVO_REUNION_KO; }
            } catch(PDOException $e) {
                if ($e->getCode() == '23000'){
                    $this->message = CONSTRAINT_MOTIVO_REUNION;
                }
            }
            $this->closeConnection();
        }
    }

}

?>