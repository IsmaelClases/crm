<?php

require_once('interfaces/crud.php');
require_once('../conn.php');

class Asistente extends Conexion implements crud {

    public $status = false;
    public $message = NULL;
    public $data = NULL;
    const ROUTE = 'asistente';

    function __construct (){
        parent::__construct();
    }

    public function get() {

        // $data trae el id_reunion
        // //$id_reunion = $data['id_reunion'];
        // $id_reunion = 1;

        // $sql = $this->conexion->prepare("SELECT A.*, LTRIM(CONCAT(C.nombre, ' ', C.apellidos)) AS nombre_completo, IFNULL(LTRIM(CONCAT(C.direccion, ' ', C.cp, ' ', C.localidad, ' ', P.provincia)), '')  AS direccion_completa, E.entidad
        // FROM sgi_asistentes A,
        // sgi_contactos C 
        //     LEFT JOIN sgi_provincias P ON C.id_provincia = P.id_provincia
        //     LEFT JOIN sgi_entidades E ON C.id_entidad = E.id_entidad
        // WHERE A.id_contacto = C.id_contacto
        // AND A.id_reunion = :id_reunion");

        // $sql->bindParam(":id_reunion", $id_reunion, PDO::PARAM_INT);

        // $exito = $sql->execute();

        // if($exito) {
        //     $this->status = true;
        //     $this->data =  $sql->fetchAll(PDO::FETCH_ASSOC);
        // }

        // $this->closeConnection();

    }

    // Añade un asistente
    // Hay que tener en cuenta que no se pueden duplicar
    public function create($data) {
        
        $id_contacto = $data['id_contacto'];
        $id_reunion = $data['id_reunion'];

        if (isset($id_contacto) && (isset($id_reunion))) {
            try {
                $sql = $this->conexion->prepare("INSERT INTO sgi_asistentes (id_contacto, id_reunion)
                VALUES (:id_contacto, :id_reunion)");
                $sql->bindParam(":id_contacto", $id_contacto, PDO::PARAM_INT);
                $sql->bindParam(":id_reunion", $id_reunion, PDO::PARAM_INT);
   
               $resultado = $sql->execute();
               if ($resultado) {
                   $this->status = true;
                   $this->message = ADD_ASISTENTE_OK;
               } else {$this->message = ADD_ASISTENTE_KO;}
            } catch(PDOException $e) {
                if ($e->getCode() == '23000'){
                    $this->message = CONSTRAINT_ASISTENTE;
                }
            }

            $this->closeConnection();
        }

    }

    // Trae todos los asistentes de una reunión
    public function update($data) {
        $order = " ORDER BY nombre_completo, direccion_completa ";

        $id_reunion = $data;

        $sql = $this->conexion->prepare("SELECT A.*, LTRIM(CONCAT(IFNULL(C.nombre,''), ' ', C.apellidos)) AS nombre_completo, IFNULL(LTRIM(CONCAT(IFNULL(C.direccion,''), ' ', IFNULL(C.cp,''), ' ', IFNULL(C.localidad,''), ' ', IFNULL(P.provincia,''))), '')  AS direccion_completa, E.entidad, IFNULL(C.cargo,'') AS cargo
        FROM sgi_asistentes A,
        sgi_contactos C 
            LEFT JOIN sgi_provincias P ON C.id_provincia = P.id_provincia
            LEFT JOIN sgi_entidades E ON C.id_entidad = E.id_entidad
        WHERE A.id_contacto = C.id_contacto
        AND A.id_reunion = :id_reunion".$order);

        $sql->bindParam(":id_reunion", $id_reunion, PDO::PARAM_INT);

        $exito = $sql->execute();

        if($exito) {
            $this->status = true;
            $this->data =  $sql->fetchAll(PDO::FETCH_ASSOC);
        }

        $this->closeConnection();
    }

    // Quita un asistente
    public function delete($idAsistente) {
        if (isset($idAsistente)) {
            try {
                $sql = $this->conexion->prepare("DELETE FROM sgi_asistentes WHERE id_asistente = :idAsistente");
                $sql->bindParam(":idAsistente", $idAsistente, PDO::PARAM_INT);

                $resultado = $sql->execute();
                if ($resultado) {
                    $this->status = true;
                    $this->message = DELETE_ASISTENTE_OK;
                    $this->data = $idAsistente;
                } else { $this->message = DELETE_ASISTENTE_KO; }
            } catch(PDOException $e) {
                if ($e->getCode() == '23000'){
                    $this->message = CONSTRAINT_ASISTENTE;
                }
            }
            $this->closeConnection();
        }
    }

}

?>