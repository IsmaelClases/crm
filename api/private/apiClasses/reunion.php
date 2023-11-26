<?php

require_once('interfaces/crud.php');
require_once('../conn.php');
require_once('./Classes/custom_dom_pdf.php');

 error_reporting(E_ALL);
 ini_set('display_errors', '1');

class Reunion extends Conexion {
    public $status = false;
    public $message = NULL;
    public $data = NULL;
    const ROUTE = 'reunion';
    const ROUTE_INFORME = 'informe';

    function __construct (){
        parent::__construct();
    }

    private function getDataInformeReunion($id_reunion) {
        $sql = $this->conexion->prepare("SELECT
            R.*,
            MR.modo_reunion AS fk_modo_reunion,
            MR2.motivo_reunion AS fk_motivo_reunion,
            E.entidad AS fk_entidad_target,
            E.codigo AS fk_codigo,
            Z.zona AS fk_zona,
            IFNULL(LTRIM(CONCAT(C.nombre, ' ', C.apellidos)),'') AS fk_contacto
            FROM sgi_reuniones R
                LEFT JOIN sgi_modos_reunion MR ON R.id_modo_reunion = MR.id_modo_reunion
                LEFT JOIN sgi_motivos_reunion MR2 ON R.id_motivo_reunion = MR2.id_motivo_reunion
                LEFT JOIN sgi_entidades E ON R.id_entidad_target = E.id_entidad
                LEFT JOIN sgi_zonas Z ON R.id_zona = Z.id_zona
                LEFT JOIN sgi_contactos C ON R.id_contacto = C.id_contacto
            WHERE R.id_reunion = :id");
         $sql->bindParam("id", $id_reunion);

         $exito = $sql->execute();

         if($exito) {
             return $sql->fetch(PDO::FETCH_ASSOC);
         }
    }

    private function getDataInformeAsistentes($id_reunion) {

        $order = " ORDER BY entidad, nombre_completo, cargo ";

        $sql = $this->conexion->prepare("SELECT A.*, LTRIM(CONCAT(IFNULL(C.nombre,''), ' ', C.apellidos)) AS nombre_completo, C.cargo, E.entidad
        FROM sgi_asistentes A,
        sgi_contactos C
            LEFT JOIN sgi_entidades E ON C.id_entidad = E.id_entidad
        WHERE A.id_contacto = C.id_contacto
        AND A.id_reunion = :id_reunion".$order);

        $sql->bindParam(":id_reunion", $id_reunion, PDO::PARAM_INT);

        $exito = $sql->execute();

        if($exito) {
            return $sql->fetchAll(PDO::FETCH_ASSOC);
        }

    }

    public function getInforme($id) {

        $informe = new CustomDomPDF();
        $data_reunion = $this->getDataInformeReunion($id);
        $data_asistentes = $this->getDataInformeAsistentes($id);
        // TODO:Podemos revisar que el informe tenga los resultados de la reunión y al menos 1 asistente

        //var_dump($data_asistentes);

        $informe->loadTemplateInforme($data_reunion, $data_asistentes);
        //$informe->loadTemplateInforme($data_reunion);

        if ($informe) {
            $this->status = true;
            $this->data = $informe->generatePDF();
            $this->message = INFORME_OK;
        } else {
            $this->message = INFORME_KO;
        }

        // if($data_informe['ISBN'] && $data_informe['FechaExpedicion'] && $data_informe['FechaPago']) {
        //     $this->status = true;
        //     $this->data = $informe->generatePDF();
        // } else {
        //     $this->message = INFORME_KO;
        // }

        $this->closeConnection();
    }

    public function get($id) {
    // Si $id entonces sólo quiere una reunion, sino todas

        $order = " ORDER BY fecha DESC ";

        if ($id) {
            $where = " WHERE R.id_reunion = :id_reunion ";
        } else {
            $where = "";
        }

        $sql = $this->conexion->prepare("SELECT
            R.*,
            MR.modo_reunion AS fk_modo_reunion,
            MR2.motivo_reunion AS fk_motivo_reunion,
            IFNULL(E.entidad,'') AS fk_entidad_target,
            Z.zona AS fk_zona,
            IFNULL(LTRIM(CONCAT(C.nombre, ' ', C.apellidos)),'') AS fk_contacto
            FROM sgi_reuniones R
                LEFT JOIN sgi_modos_reunion MR ON R.id_modo_reunion = MR.id_modo_reunion
                LEFT JOIN sgi_motivos_reunion MR2 ON R.id_motivo_reunion = MR2.id_motivo_reunion
                LEFT JOIN sgi_entidades E ON R.id_entidad_target = E.id_entidad
                LEFT JOIN sgi_zonas Z ON R.id_zona = Z.id_zona
                LEFT JOIN sgi_contactos C ON R.id_contacto = C.id_contacto
            ".$where.$order);

        if ($id) {
            $sql->bindParam(":id_reunion", $id, PDO::PARAM_INT);
        }

        $exito = $sql->execute();

        if($exito) {
            $this->status = true;
            if ($id) {
               // recogemos una sóla línea si sólo quiere una reunión
                $this->data =  $sql->fetch(PDO::FETCH_ASSOC);
            } else {
                // recogemos todas las reuniones
                $this->data =  $sql->fetchAll(PDO::FETCH_ASSOC);
            }

        }

        $this->closeConnection();

    }

    public function create($data) {
        $reunion = $data['reunion'];
        $objetivo = $data['objetivo'];
        $resultado = $data['resultado'];
        $fecha = $data['fecha'];
        $hora_inicio = $data['hora_inicio'];
        $hora_fin = $data['hora_fin'];
        $ubicacion = $data['ubicacion'];
        $localidad = $data['localidad'];
        $observaciones = $data['observaciones'];

        $data['id_modo_reunion'] == '' ? $id_modo_reunion = null : $id_modo_reunion = $data['id_modo_reunion'];
        $data['id_motivo_reunion'] == '' ? $id_motivo_reunion = null : $id_motivo_reunion = $data['id_motivo_reunion'];
        $data['id_entidad_target'] == '' ? $id_entidad_target = null : $id_entidad_target = $data['id_entidad_target'];
        $data['id_zona'] == '' ? $id_zona = null : $id_zona = $data['id_zona'];
        $data['id_contacto'] == '' ? $id_contacto = null : $id_contacto = $data['id_contacto'];

        if (isset($id_modo_reunion) && isset($id_motivo_reunion) && isset($id_zona) && isset($reunion) && isset($fecha) && isset($hora_fin) && isset($hora_inicio) && isset($localidad)) {
            $sql = $this->conexion->prepare("INSERT INTO sgi_reuniones (reunion, id_contacto, id_modo_reunion, id_motivo_reunion, id_entidad_target, id_zona, objetivo, resultado, observaciones, fecha, hora_inicio, hora_fin, ubicacion, localidad)
                    VALUES (:reunion, :id_contacto, :id_modo_reunion, :id_motivo_reunion, :id_entidad_target, :id_zona, :objetivo, :resultado, :observaciones, :fecha, :hora_inicio, :hora_fin, :ubicacion, :localidad)");

            $sql->bindParam(":reunion", $reunion, PDO::PARAM_STR);
            $sql->bindParam(":id_contacto", $id_contacto, PDO::PARAM_INT);
            $sql->bindParam(":id_modo_reunion", $id_modo_reunion, PDO::PARAM_INT);
            $sql->bindParam(":id_motivo_reunion", $id_motivo_reunion, PDO::PARAM_INT);
            $sql->bindParam(":id_entidad_target", $id_entidad_target, PDO::PARAM_INT);
            $sql->bindParam(":id_zona", $id_zona, PDO::PARAM_INT);
            $sql->bindParam(":objetivo", $objetivo, PDO::PARAM_STR);
            $sql->bindParam(":resultado", $resultado, PDO::PARAM_STR);
            $sql->bindParam(":fecha", $fecha, PDO::PARAM_STR);
            $sql->bindParam(":hora_inicio", $hora_inicio, PDO::PARAM_STR);
            $sql->bindParam(":hora_fin", $hora_fin, PDO::PARAM_STR);
            $sql->bindParam(":ubicacion", $ubicacion, PDO::PARAM_STR);
            $sql->bindParam(":localidad", $localidad, PDO::PARAM_STR);
            $sql->bindParam(":observaciones", $observaciones, PDO::PARAM_STR);

            $resultado = $sql->execute();
            if ($resultado) {
                $this->status = true;
                $this->message = ADD_REUNION_OK;
            } else {$this->message = ADD_REUNION_KO;}

            $this->closeConnection();
        }
    }

    public function update($data) {
        $id_reunion = $data['id_reunion'];
        $reunion = $data['reunion'];
        $objetivo = $data['objetivo'];
        $resultado = $data['resultado'];
        $fecha = $data['fecha'];
        $hora_inicio = $data['hora_inicio'];
        $hora_fin = $data['hora_fin'];
        $ubicacion = $data['ubicacion'];
        $localidad = $data['localidad'];
        $observaciones = $data['observaciones'];

        // REVISAR //////////////////
        $data['id_modo_reunion'] == '' ? $id_modo_reunion = null : $id_modo_reunion = $data['id_modo_reunion'];
        $data['id_motivo_reunion'] == '' ? $id_motivo_reunion = null : $id_motivo_reunion = $data['id_motivo_reunion'];
        $data['id_entidad_target'] == '' ? $id_entidad_target = null : $id_entidad_target = $data['id_entidad_target'];
        $data['id_zona'] == '' ? $id_zona = null : $id_zona = $data['id_zona'];
        $data['id_contacto'] == '' ? $id_contacto = null : $id_contacto = $data['id_contacto'];
        //////////////////////////////

        if (isset($id_modo_reunion) && isset($id_motivo_reunion) && isset($id_zona) && isset($reunion) && isset($fecha) && isset($hora_inicio) && isset($hora_fin) && isset($localidad)) {

            $sql = $this->conexion->prepare("UPDATE sgi_reuniones SET
                    reunion = :reunion,
                    id_contacto = :id_contacto,
                    id_modo_reunion = :id_modo_reunion,
                    id_motivo_reunion = :id_motivo_reunion,
                    id_entidad_target = :id_entidad_target,
                    id_zona = :id_zona,
                    objetivo = :objetivo,
                    resultado = :resultado,
                    fecha = :fecha,
                    hora_inicio = :hora_inicio,
                    hora_fin = :hora_fin,
                    ubicacion = :ubicacion,
                    localidad = :localidad,
                    observaciones = :observaciones
                    WHERE id_reunion = :id_reunion");

            $sql->bindParam(":id_reunion", $id_reunion, PDO::PARAM_INT);
            $sql->bindParam(":reunion", $reunion, PDO::PARAM_STR);
            $sql->bindParam(":id_contacto", $id_contacto, PDO::PARAM_INT);
            $sql->bindParam(":id_modo_reunion", $id_modo_reunion, PDO::PARAM_INT);
            $sql->bindParam(":id_motivo_reunion", $id_motivo_reunion, PDO::PARAM_INT);
            $sql->bindParam(":id_entidad_target", $id_entidad_target, PDO::PARAM_INT);
            $sql->bindParam(":id_zona", $id_zona, PDO::PARAM_INT);
            $sql->bindParam(":objetivo", $objetivo, PDO::PARAM_STR);
            $sql->bindParam(":resultado", $resultado, PDO::PARAM_STR);
            $sql->bindParam(":fecha", $fecha, PDO::PARAM_STR);
            $sql->bindParam(":hora_inicio", $hora_inicio, PDO::PARAM_STR);
            $sql->bindParam(":hora_fin", $hora_fin, PDO::PARAM_STR);
            $sql->bindParam(":ubicacion", $ubicacion, PDO::PARAM_STR);
            $sql->bindParam(":localidad", $localidad, PDO::PARAM_STR);
            $sql->bindParam(":observaciones", $observaciones, PDO::PARAM_STR);

            $resultado = $sql->execute();
            if ($resultado) {
                $this->status = true;
                $this->message = EDIT_REUNION_OK;
            } else { $this->message = EDIT_REUNION_KO; }

            $this->closeConnection();
        }
    }

    public function delete($id_reunion) {
        if (isset($id_reunion)) {
            try {
                $sql = $this->conexion->prepare("DELETE FROM sgi_reuniones WHERE id_reunion = :id_reunion");
                $sql->bindParam(":id_reunion", $id_reunion, PDO::PARAM_INT);

                $resultado = $sql->execute();
                if ($resultado) {
                    $this->status = true;
                    $this->message = DELETE_REUNION_OK;
                    $this->data = $id_reunion;
                } else { $this->message = DELETE_REUNION_KO; }
            } catch(PDOException $e) {
                if ($e->getCode() == '23000'){
                    $this->message = CONSTRAINT_REUNION;
                }
            }
            $this->closeConnection();
        }
    }

}

?>
