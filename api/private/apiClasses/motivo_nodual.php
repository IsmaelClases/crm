<?php

require_once('interfaces/crud.php');
require_once('../conn.php');

class MotivoNodual extends Conexion {

    public $status = false;
    public $message = NULL;
    public $data = NULL;
    const ROUTE = 'motivo-nodual';

    function __construct (){
        parent::__construct();
    }

    public function get($entidad) {
        $order = " ORDER BY motivo_nodual ";

        if ($entidad) {
            $where = " WHERE MN.id_tipo_entidad IN ( 
                SELECT id_tipo_entidad FROM sgi_entidades WHERE id_entidad = :id_entidad) ";
        } else {
            $where = " ";
        }

        $sql = $this->conexion->prepare(
            "SELECT MN.*, TE.tipo_entidad AS fk_tipo_entidad
            FROM sgi_motivos_nodual MN
            INNER JOIN sgi_tipos_entidad TE ON TE.id_tipo_entidad = MN.id_tipo_entidad
            ".$where.$order);

        if ($entidad) {
            $sql->bindParam(":id_entidad", $entidad, PDO::PARAM_INT);
        }

        $exito = $sql->execute();

        if($exito) {
            $this->status = true;
            $this->data =  $sql->fetchAll(PDO::FETCH_ASSOC);
        }

        $this->closeConnection();

    }

    public function create($data) {
        $motivoNodual = $data['motivo_nodual'];
        $id_tipo_entidad = $data['id_tipo_entidad'];
        $observaciones = $data['observaciones'];

        if (isset($motivoNodual) && isset($id_tipo_entidad)) {
            $sql = $this->conexion->prepare("INSERT INTO sgi_motivos_nodual (motivo_nodual, id_tipo_entidad, observaciones)
                    VALUES (:motivoNodual, :id_tipo_entidad, :observaciones)");
            $sql->bindParam(":motivoNodual", $motivoNodual, PDO::PARAM_STR);
            $sql->bindParam(":id_tipo_entidad", $id_tipo_entidad, PDO::PARAM_STR);
            $sql->bindParam(":observaciones", $observaciones, PDO::PARAM_STR);

            $resultado = $sql->execute();
            if ($resultado) {
                $this->status = true;
                $this->message = ADD_MOTIVO_NODUAL_OK;
            } else {$this->message = ADD_MOTIVO_NODUAL_KO;}

            $this->closeConnection();
        }
    }

    public function update($data) {
        $idMotivoNodual = $data['id_motivo_nodual'];
        $motivoNodual = $data['motivo_nodual'];
        $id_tipo_entidad = $data['id_tipo_entidad'];
        $observaciones = $data['observaciones'];

        if (isset($motivoNodual) && isset($id_tipo_entidad)) {
            $sql = $this->conexion->prepare("UPDATE sgi_motivos_nodual SET
                    motivo_nodual = :motivoNodual,
                    id_tipo_entidad = :id_tipo_entidad,
                    observaciones = :observaciones
                    WHERE id_motivo_nodual = :idMotivoNodual");
            
            $sql->bindParam(":motivoNodual", $motivoNodual, PDO::PARAM_STR);
            $sql->bindParam(":id_tipo_entidad", $id_tipo_entidad, PDO::PARAM_INT);
            $sql->bindParam(":observaciones", $observaciones, PDO::PARAM_STR);
            $sql->bindParam(":idMotivoNodual", $idMotivoNodual, PDO::PARAM_INT);

            $resultado = $sql->execute();
            if ($resultado) {
                $this->status = true;
                $this->message = EDIT_MOTIVO_NODUAL_OK;
            } else { $this->message = EDIT_MOTIVO_NODUAL_KO; }

            $this->closeConnection();
        }
    }

    public function delete($idMotivoNodual) {
        if (isset($idMotivoNodual)) {
            try {
                $sql = $this->conexion->prepare("DELETE FROM sgi_motivos_nodual WHERE id_motivo_nodual = :idMotivoNodual");
                $sql->bindParam(":idMotivoNodual", $idMotivoNodual, PDO::PARAM_INT);

                $resultado = $sql->execute();
                if ($resultado) {
                    $this->status = true;
                    $this->message = DELETE_MOTIVO_NODUAL_OK;
                    $this->data = $idMotivoNodual;
                } else { $this->message = DELETE_MOTIVO_NODUAL_KO; }
            } catch(PDOException $e) {
                if ($e->getCode() == '23000'){
                    $this->message = CONSTRAINT_MOTIVO_NODUAL;
                }
            }
            $this->closeConnection();
        }
    }

}

?>