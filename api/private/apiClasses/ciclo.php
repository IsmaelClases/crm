<?php

require_once('interfaces/crud.php');
require_once('../conn.php');

class Ciclo extends Conexion implements crud {

    public $status = false;
    public $message = NULL;
    public $data = NULL;
    const ROUTE = 'ciclo';

    function __construct (){
        parent::__construct();
    }

    public function get() {
        //$order = " ORDER BY fk_familia, id_nivel, ciclo ";
        $order = " ORDER BY ciclo ";

        $sql = $this->conexion->prepare(
            "SELECT C.*, F.familia AS fk_familia, N.nivel AS fk_nivel
            FROM sgi_ciclos C
            INNER JOIN sgi_familias F ON F.id_familia = C.id_familia
            INNER JOIN sgi_niveles N ON N.id_nivel = C.id_nivel
            ".$order);

        $exito = $sql->execute();

        if($exito) {
            $this->status = true;
            $this->data =  $sql->fetchAll(PDO::FETCH_ASSOC);
        }

        $this->closeConnection();

    }

    public function create($data) {
        $ciclo = $data['ciclo'];
        $cod_ciclo = $data['cod_ciclo'];
        $id_nivel = $data['id_nivel'];
        $id_familia = $data['id_familia'];
        $observaciones = $data['observaciones'];

        if (isset($ciclo) && isset($cod_ciclo) && isset($id_nivel) && isset($id_familia)) {
            $sql = $this->conexion->prepare("INSERT INTO sgi_ciclos (ciclo, cod_ciclo, id_nivel, id_familia, observaciones)
                    VALUES (:ciclo, :cod_ciclo, :id_nivel, :id_familia, :observaciones)");
            $sql->bindParam(":ciclo", $ciclo, PDO::PARAM_STR);
            $sql->bindParam(":cod_ciclo", $cod_ciclo, PDO::PARAM_STR);
            $sql->bindParam(":id_nivel", $id_nivel, PDO::PARAM_INT);
            $sql->bindParam(":id_familia", $id_familia, PDO::PARAM_INT);
            $sql->bindParam(":observaciones", $observaciones, PDO::PARAM_STR);

            $resultado = $sql->execute();
            if ($resultado) {
                $this->status = true;
                $this->message = ADD_CICLO_OK;
            } else {$this->message = ADD_CICLO_KO;}

            $this->closeConnection();
        }
    }

    public function update($data) {
        $idCiclo = $data['id_ciclo'];
        $ciclo = $data['ciclo'];
        $cod_ciclo = $data['cod_ciclo'];
        $id_nivel = $data['id_nivel'];
        $id_familia = $data['id_familia'];
        $observaciones = $data['observaciones'];

        if (isset($ciclo) && isset($cod_ciclo) && isset($id_nivel) && isset($id_familia)) {
            $sql = $this->conexion->prepare("UPDATE sgi_ciclos SET
                    ciclo = :ciclo,
                    cod_ciclo = :cod_ciclo,
                    id_nivel = :id_nivel,
                    id_familia = :id_familia,
                    observaciones = :observaciones
                    WHERE id_ciclo = :idCiclo");
            
            $sql->bindParam(":ciclo", $ciclo, PDO::PARAM_STR);
            $sql->bindParam(":cod_ciclo", $cod_ciclo, PDO::PARAM_STR);
            $sql->bindParam(":id_nivel", $id_nivel, PDO::PARAM_INT);
            $sql->bindParam(":id_familia", $id_familia, PDO::PARAM_INT);
            $sql->bindParam(":observaciones", $observaciones, PDO::PARAM_STR);
            $sql->bindParam(":idCiclo", $idCiclo, PDO::PARAM_INT);

            $resultado = $sql->execute();
            if ($resultado) {
                $this->status = true;
                $this->message = EDIT_CICLO_OK;
            } else { $this->message = EDIT_CICLO_KO; }

            $this->closeConnection();
        }
    }

    public function delete($idCiclo) {
        if (isset($idCiclo)) {
            try {
                $sql = $this->conexion->prepare("DELETE FROM sgi_ciclos WHERE id_ciclo = :idCiclo");
                $sql->bindParam(":idCiclo", $idCiclo, PDO::PARAM_INT);

                $resultado = $sql->execute();
                if ($resultado) {
                    $this->status = true;
                    $this->message = DELETE_CICLO_OK;
                    $this->data = $idCiclo;
                } else { $this->message = DELETE_CICLO_KO; }
            } catch(PDOException $e) {
                if ($e->getCode() == '23000'){
                    $this->message = CONSTRAINT_CICLO;
                }
            }
            $this->closeConnection();
        }
    }

}

?>