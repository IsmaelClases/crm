<?php

require_once('interfaces/crud.php');
require_once('../conn.php');

class Unidad extends Conexion {

    public $status = false;
    public $message = NULL;
    public $data = NULL;
    const ROUTE = 'unidad';

    function __construct (){
        parent::__construct();
    }

    public function get($entidad) {
        $order = " ORDER BY unidad ";

        if ($entidad > 0) {
            $where = " WHERE U.id_entidad = :entidad ";
        } else {
            $where = " ";
        }

        $sql = $this->conexion->prepare(
            "SELECT U.*, E.entidad AS fk_entidad, C.ciclo AS fk_ciclo, UD.unidad_dual AS fk_unidad_dual, IFNULL(MN.motivo_nodual, '') AS fk_motivo_nodual, Z.zona AS fk_zona, IFNULL(P.provincia,'') AS fk_provincia, E.id_zona, E.id_provincia, TE.tipo_entidad AS fk_tipo_entidad, E.id_tipo_entidad
            FROM sgi_unidades U
            INNER JOIN sgi_entidades E ON E.id_entidad = U.id_entidad
            INNER JOIN sgi_ciclos C ON C.id_ciclo = U.id_ciclo
            INNER JOIN sgi_unidades_dual UD ON UD.id_unidad_dual = U.id_unidad_dual
            LEFT JOIN sgi_motivos_nodual MN ON MN.id_motivo_nodual = U.id_motivo_nodual
            INNER JOIN sgi_zonas Z ON Z.id_zona = E.id_zona
            LEFT JOIN sgi_provincias P ON P.id_provincia = E.id_provincia
            INNER JOIN sgi_tipos_entidad TE ON TE.id_tipo_entidad = E.id_tipo_entidad
            ".$where.$order);

        if ($entidad > 0) {
            $sql->bindParam(":entidad", $entidad, PDO::PARAM_STR);
        }

        $exito = $sql->execute();

        if($exito) {
            $this->status = true;
            $this->data =  $sql->fetchAll(PDO::FETCH_ASSOC);
        }

        $this->closeConnection();

    }

    public function create($data) {
        $id_entidad = $this->trimIfString($data['id_entidad']);
        $id_ciclo = $this->trimIfString($data['id_ciclo']);
        $unidad = $this->trimIfString($data['unidad']);
        $plazas = $this->trimIfString($data['plazas']);
        $id_unidad_dual = $this->trimIfString($data['id_unidad_dual']);
        $id_motivo_nodual = $this->trimIfString($data['id_motivo_nodual']);
        $observaciones = $this->trimIfString($data['observaciones']);

        $data['id_motivo_nodual'] == '' ? $id_motivo_nodual = null : $id_motivo_nodual = $data['id_motivo_nodual'];

        if (isset($id_entidad) && isset($id_ciclo) && isset($unidad) && isset($plazas) && isset($id_unidad_dual)) {

            if ($id_unidad_dual > 1) {
                $id_motivo_nodual = null;
            }

            $sql = $this->conexion->prepare("INSERT INTO sgi_unidades (id_entidad, id_ciclo, unidad, plazas, id_unidad_dual, id_motivo_nodual, observaciones)
                    VALUES (:id_entidad, :id_ciclo, :unidad, :plazas, :id_unidad_dual, :id_motivo_nodual, :observaciones)");
            $sql->bindParam(":id_entidad", $id_entidad, PDO::PARAM_INT);
            $sql->bindParam(":id_ciclo", $id_ciclo, PDO::PARAM_INT);
            $sql->bindParam(":unidad", $unidad, PDO::PARAM_STR);
            $sql->bindParam(":id_unidad_dual", $id_unidad_dual, PDO::PARAM_INT);
            $sql->bindParam(":plazas", $plazas, PDO::PARAM_INT);
            $sql->bindParam(":id_motivo_nodual", $id_motivo_nodual, PDO::PARAM_INT);
            $sql->bindParam(":observaciones", $observaciones, PDO::PARAM_STR);

            try {
                $resultado = $sql->execute();
                if ($resultado) {
                    $this->status = true;
                    $this->message = ADD_UNIDAD_OK;
                } else {$this->message = ADD_UNIDAD_KO;}
            } catch (PDOException $error) {
                $this->status = false;
                $this->message = ADD_UNIDAD_KO;
            }


            $this->closeConnection();
        }
    }

    public function update($data) {
        $idUnidad = $data['id_unidad'];
        $id_entidad = $this->trimIfString($data['id_entidad']);
        $id_ciclo = $this->trimIfString($data['id_ciclo']);
        $unidad = $this->trimIfString($data['unidad']);
        $plazas = $this->trimIfString($data['plazas']);
        $id_unidad_dual = $this->trimIfString($data['id_unidad_dual']);
        $id_motivo_nodual = $this->trimIfString($data['id_motivo_nodual']);
        $observaciones = $this->trimIfString($data['observaciones']);

        $data['id_motivo_nodual'] == '' ? $id_motivo_nodual = null : $id_motivo_nodual = $data['id_motivo_nodual'];

        if (isset($id_entidad) && isset($id_ciclo) && isset($unidad) && isset($plazas) && isset($id_unidad_dual)) {

            if ($id_unidad_dual > 1) {
                $id_motivo_nodual = null;
            }

            $sql = $this->conexion->prepare("UPDATE sgi_unidades SET
                    id_entidad = :id_entidad,
                    id_ciclo = :id_ciclo,
                    unidad = :unidad,
                    plazas = :plazas,
                    id_unidad_dual = :id_unidad_dual,
                    id_motivo_nodual = :id_motivo_nodual,
                    observaciones = :observaciones
                    WHERE id_unidad = :idUnidad");
            
            $sql->bindParam(":id_entidad", $id_entidad, PDO::PARAM_INT);
            $sql->bindParam(":id_ciclo", $id_ciclo, PDO::PARAM_INT);
            $sql->bindParam(":unidad", $unidad, PDO::PARAM_STR);
            $sql->bindParam(":plazas", $plazas, PDO::PARAM_INT);
            $sql->bindParam(":id_unidad_dual", $id_unidad_dual, PDO::PARAM_INT);
            $sql->bindParam(":id_motivo_nodual", $id_motivo_nodual, PDO::PARAM_INT);
            $sql->bindParam(":observaciones", $observaciones, PDO::PARAM_STR);
            $sql->bindParam(":idUnidad", $idUnidad, PDO::PARAM_INT);

            try {
                $resultado = $sql->execute();
                if ($resultado) {
                    $this->status = true;
                    $this->message = EDIT_UNIDAD_OK;
                } else { $this->message = EDIT_UNIDAD_KO; }
            } catch (PDOException $error) {
                $this->status = false;
                $this->message = EDIT_UNIDAD_KO;
            }
            $this->closeConnection();
        }
    }

    public function delete($idUnidad) {
        if (isset($idUnidad)) {
            try {
                $sql = $this->conexion->prepare("DELETE FROM sgi_unidades WHERE id_unidad = :idUnidad");
                $sql->bindParam(":idUnidad", $idUnidad, PDO::PARAM_INT);

                $resultado = $sql->execute();
                if ($resultado) {
                    $this->status = true;
                    $this->message = DELETE_UNIDAD_OK;
                    $this->data = $idUnidad;
                } else { $this->message = DELETE_UNIDAD_KO; }
            } catch(PDOException $e) {
                if ($e->getCode() == '23000'){
                    $this->message = CONSTRAINT_UNIDAD;
                }
            }
            $this->closeConnection();
        }
    }

}

?>