<?php

require_once('interfaces/crud.php');
require_once('../conn.php');

class ModoReunion extends Conexion implements crud {

    public $status = false;
    public $message = NULL;
    public $data = NULL;
    const ROUTE = 'modo-reunion';

    function __construct (){
        parent::__construct();
    }

    public function get() {
        $order = " ORDER BY modo_reunion ";

        $sql = $this->conexion->prepare("SELECT * FROM sgi_modos_reunion".$order);

        $exito = $sql->execute();

        if($exito) {
            $this->status = true;
            $this->data =  $sql->fetchAll(PDO::FETCH_ASSOC);
        }

        $this->closeConnection();

    }

    public function create($data) {
        $modoReunion = $data['modo_reunion'];
        $observaciones = $data['observaciones'];

        if (isset($modoReunion)) {
            $sql = $this->conexion->prepare("INSERT INTO sgi_modos_reunion (modo_reunion, observaciones)
                    VALUES (:modoReunion, :observaciones)");
            $sql->bindParam(":modoReunion", $modoReunion, PDO::PARAM_STR);
            $sql->bindParam(":observaciones", $observaciones, PDO::PARAM_STR);

            $resultado = $sql->execute();
            if ($resultado) {
                $this->status = true;
                $this->message = ADD_MODO_REUNION_OK;
            } else {$this->message = ADD_MODO_REUNION_KO;}

            $this->closeConnection();
        }
    }

    public function update($data) {
        $idModoReunion = $data['id_modo_reunion'];
        $modoReunion = $data['modo_reunion'];
        $observaciones = $data['observaciones'];

        if (isset($modoReunion)) {
            $sql = $this->conexion->prepare("UPDATE sgi_modos_reunion SET
                    modo_reunion = :modoReunion,
                    observaciones = :observaciones
                    WHERE id_modo_reunion = :idModoReunion");
            
            $sql->bindParam(":modoReunion", $modoReunion, PDO::PARAM_STR);
            $sql->bindParam(":observaciones", $observaciones, PDO::PARAM_STR);
            $sql->bindParam(":idModoReunion", $idModoReunion, PDO::PARAM_INT);

            $resultado = $sql->execute();
            if ($resultado) {
                $this->status = true;
                $this->message = EDIT_MODO_REUNION_OK;
            } else { $this->message = EDIT_MODO_REUNION_KO; }

            $this->closeConnection();
        }
    }

    public function delete($idModoReunion) {
        if (isset($idModoReunion)) {
            try {
                $sql = $this->conexion->prepare("DELETE FROM sgi_modos_reunion WHERE id_modo_reunion = :idModoReunion");
                $sql->bindParam(":idModoReunion", $idModoReunion, PDO::PARAM_INT);

                $resultado = $sql->execute();
                if ($resultado) {
                    $this->status = true;
                    $this->message = DELETE_MODO_REUNION_OK;
                    $this->data = $idModoReunion;
                } else { $this->message = DELETE_MODO_REUNION_KO; }
            } catch(PDOException $e) {
                if ($e->getCode() == '23000'){
                    $this->message = CONSTRAINT_MODO_REUNION;
                }
            }
            $this->closeConnection();
        }
    }

}

?>