<?php

require_once('interfaces/crud.php');
require_once('../conn.php');

class Nivel extends Conexion implements crud {

    public $status = false;
    public $message = NULL;
    public $data = NULL;
    const ROUTE = 'nivel';

    function __construct (){
        parent::__construct();
    }

    public function get() {
        $order = " ORDER BY id_nivel ";

        $sql = $this->conexion->prepare("SELECT * FROM sgi_niveles".$order);

        $exito = $sql->execute();

        if($exito) {
            $this->status = true;
            $this->data =  $sql->fetchAll(PDO::FETCH_ASSOC);
        }

        $this->closeConnection();

    }

    public function create($data) {
        $nivel = $data['nivel'];
        $cod_nivel = $data['cod_nivel'];
        $titulo = $data['titulo'];
        $observaciones = $data['observaciones'];

        if (isset($nivel) && isset($cod_nivel) && isset($titulo)) {
            $sql = $this->conexion->prepare("INSERT INTO sgi_niveles (nivel, cod_nivel, titulo, observaciones)
                    VALUES (:nivel, :cod_nivel, :titulo, :observaciones)");
            $sql->bindParam(":nivel", $nivel, PDO::PARAM_STR);
            $sql->bindParam(":cod_nivel", $cod_nivel, PDO::PARAM_STR);
            $sql->bindParam(":titulo", $titulo, PDO::PARAM_STR);
            $sql->bindParam(":observaciones", $observaciones, PDO::PARAM_STR);

            $resultado = $sql->execute();
            if ($resultado) {
                $this->status = true;
                $this->message = ADD_NIVEL_OK;
            } else {$this->message = ADD_NIVEL_KO;}

            $this->closeConnection();
        }
    }

    public function update($data) {
        $idNivel = $data['id_nivel'];
        $nivel = $data['nivel'];
        $cod_nivel = $data['cod_nivel'];
        $titulo = $data['titulo'];
        $observaciones = $data['observaciones'];

        if (isset($nivel) && isset($cod_nivel) && isset($titulo)) {
            $sql = $this->conexion->prepare("UPDATE sgi_niveles SET
                    nivel = :nivel,
                    cod_nivel = :cod_nivel,
                    titulo = :titulo,
                    observaciones = :observaciones
                    WHERE id_nivel = :idNivel");
            
            $sql->bindParam(":nivel", $nivel, PDO::PARAM_STR);
            $sql->bindParam(":cod_nivel", $cod_nivel, PDO::PARAM_STR);
            $sql->bindParam(":titulo", $titulo, PDO::PARAM_STR);
            $sql->bindParam(":observaciones", $observaciones, PDO::PARAM_STR);
            $sql->bindParam(":idNivel", $idNivel, PDO::PARAM_INT);

            $resultado = $sql->execute();
            if ($resultado) {
                $this->status = true;
                $this->message = EDIT_NIVEL_OK;
            } else { $this->message = EDIT_NIVEL_KO; }

            $this->closeConnection();
        }
    }

    public function delete($idNivel) {
        if (isset($idNivel)) {
            try {
                $sql = $this->conexion->prepare("DELETE FROM sgi_niveles WHERE id_nivel = :idNivel");
                $sql->bindParam(":idNivel", $idNivel, PDO::PARAM_INT);

                $resultado = $sql->execute();
                if ($resultado) {
                    $this->status = true;
                    $this->message = DELETE_NIVEL_OK;
                    $this->data = $idNivel;
                } else { $this->message = DELETE_NIVEL_KO; }
            } catch(PDOException $e) {
                if ($e->getCode() == '23000'){
                    $this->message = CONSTRAINT_NIVEL;
                }
            }
            $this->closeConnection();
        }
    }

}

?>