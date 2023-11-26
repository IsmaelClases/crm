<?php

require_once('interfaces/crud.php');
require_once('../conn.php');

class Contacto extends Conexion  {

    public $status = false;
    public $message = NULL;
    public $data = NULL;
    const ROUTE = 'contactos';

    function __construct (){
        parent::__construct();
    }

    // Si entidad, entonces sacamos los contactos de una entidad
    // Si reunion, entonces sacamos los contactos que no están todavía agregados a esa reunión como asistentes
    public function get($entidad, $reunion) {
        $order = " ORDER BY nombre_completo, direccion_completa ";

        if ($entidad > 0) {
            $where = " WHERE E.id_entidad = :entidad ";
        } elseif ($reunion > 0) {
            $where = " WHERE C.id_contacto NOT IN 
            (SELECT A.id_contacto
             FROM sgi_asistentes A
             WHERE A.id_reunion = :reunion) ";
        } else {
            $where = " ";
        }


        $sql = $this->conexion->prepare("SELECT C.*, LTRIM(CONCAT(IFNULL(C.nombre,''), ' ', C.apellidos)) AS nombre_completo, IFNULL(LTRIM(CONCAT(IFNULL(C.direccion,''), ' ', IFNULL(C.cp,''), ' ', IFNULL(C.localidad,''), ' ', IFNULL(P.provincia,''))), '')  AS direccion_completa, IFNULL(E.entidad, '') AS entidad, IFNULL(F.familia, '') AS familia, IFNULL(C.cargo,'') as cargo
        FROM sgi_contactos C 
            LEFT JOIN sgi_provincias P ON C.id_provincia = P.id_provincia
            LEFT JOIN sgi_entidades E ON C.id_entidad = E.id_entidad
            LEFT JOIN sgi_familias F ON C.id_familia = F.id_familia
            ".$where.$order);

        if ($entidad > 0) {
            $sql->bindParam(":entidad", $entidad, PDO::PARAM_STR);
        } elseif ($reunion > 0) {
            $sql->bindParam(":reunion", $reunion, PDO::PARAM_STR);
        }

        $exito = $sql->execute();

        if($exito) {
            $this->status = true;
            $this->data =  $sql->fetchAll(PDO::FETCH_ASSOC);
        }

        $this->closeConnection();

    }

    public function create($data) {
        $nombre = $data['nombre'];
        $apellidos = $data['apellidos'];
        $email = $data['email'];
        $corporativo_largo = $data['corporativo_largo'];
        $corporativo_corto = $data['corporativo_corto'];
        $telefono_personal = $data['telefono_personal'];
//        $id_zona = $data['id_zona'];
//        $id_entidad = $data['id_entidad'];
        $cargo = $data['cargo'];
        $direccion = $data['direccion'];
        $cp = $data['cp'];
        $localidad = $data['localidad'];
//        $id_provincia = $data['id_provincia'];
        $observaciones = $data['observaciones'];

        $data['id_zona'] == '' ? $id_zona = null : $id_zona = $data['id_zona'];
        $data['id_entidad'] == '' ? $id_entidad = null : $id_entidad = $data['id_entidad'];
        $data['id_provincia'] == '' ? $id_provincia = null : $id_provincia = $data['id_provincia'];
        $data['id_familia'] == '' ? $id_familia = null : $id_familia = $data['id_familia'];

        if (isset($apellidos) && isset($id_entidad)) {
            $sql = $this->conexion->prepare("INSERT INTO sgi_contactos (nombre, apellidos, email, corporativo_largo, corporativo_corto, telefono_personal, id_zona, id_entidad, cargo, id_familia, direccion, cp, localidad, id_provincia, observaciones)
            VALUES (:nombre, :apellidos, :email, :corporativo_largo, :corporativo_corto, :telefono_personal, :id_zona, :id_entidad, :cargo, :id_familia, :direccion, :cp, :localidad, :id_provincia, :observaciones)");
            $sql->bindParam(":nombre", $nombre, PDO::PARAM_STR);
            $sql->bindParam(":apellidos", $apellidos, PDO::PARAM_STR);
            $sql->bindParam(":email", $email, PDO::PARAM_STR);
            $sql->bindParam(":corporativo_largo", $corporativo_largo, PDO::PARAM_STR);
            $sql->bindParam(":corporativo_corto", $corporativo_corto, PDO::PARAM_STR);
            $sql->bindParam(":telefono_personal", $telefono_personal, PDO::PARAM_STR);
            $sql->bindParam(":id_zona", $id_zona, PDO::PARAM_INT);
            $sql->bindParam(":id_entidad", $id_entidad, PDO::PARAM_INT);
            $sql->bindParam(":cargo", $cargo, PDO::PARAM_STR);
            $sql->bindParam(":id_familia", $id_familia, PDO::PARAM_INT);
            $sql->bindParam(":direccion", $direccion, PDO::PARAM_STR);
            $sql->bindParam(":cp", $cp, PDO::PARAM_STR);
            $sql->bindParam(":localidad", $localidad, PDO::PARAM_STR);
            $sql->bindParam(":id_provincia", $id_provincia, PDO::PARAM_INT);
            $sql->bindParam(":observaciones", $observaciones, PDO::PARAM_STR);

            $resultado = $sql->execute();
            if ($resultado) {
                $this->status = true;
                $this->message = ADD_CONTACTO_OK;
            } else {$this->message = ADD_CONTACTO_KO;}

            $this->closeConnection();
        }
    }

    public function update($data) {
        $id_contacto = $data['id_contacto'];
        $nombre = $data['nombre'];
        $apellidos = $data['apellidos'];
        $email = $data['email'];
        $corporativo_largo = $data['corporativo_largo'];
        $corporativo_corto = $data['corporativo_corto'];
        $telefono_personal = $data['telefono_personal'];
        $id_zona = $data['id_zona'];
        $id_entidad = $data['id_entidad'];
        $cargo = $data['cargo'];
        $id_familia = $data['id_familia'];
        $direccion = $data['direccion'];
        $cp = $data['cp'];
        $localidad = $data['localidad'];
        $id_provincia = $data['id_provincia'];
        $observaciones = $data['observaciones'];

        if (isset($apellidos) && isset($id_entidad)) {
            $sql = $this->conexion->prepare("UPDATE sgi_contactos SET
                    nombre = :nombre,
                    apellidos = :apellidos,
                    email = :email,
                    corporativo_largo = :corporativo_largo,
                    corporativo_corto = :corporativo_corto,
                    telefono_personal = :telefono_personal,
                    id_zona = :id_zona,
                    id_entidad = :id_entidad,
                    cargo = :cargo,
                    id_familia = :id_familia,
                    direccion = :direccion,
                    cp = :cp,
                    localidad = :localidad,
                    id_provincia = :id_provincia,
                    observaciones = :observaciones
                    WHERE id_contacto = :id_contacto");
            
            $sql->bindParam(":nombre", $nombre, PDO::PARAM_STR);
            $sql->bindParam(":apellidos", $apellidos, PDO::PARAM_STR);
            $sql->bindParam(":email", $email, PDO::PARAM_STR);
            $sql->bindParam(":corporativo_largo", $corporativo_largo, PDO::PARAM_STR);
            $sql->bindParam(":corporativo_corto", $corporativo_corto, PDO::PARAM_STR);
            $sql->bindParam(":telefono_personal", $telefono_personal, PDO::PARAM_STR);
            $sql->bindParam(":id_zona", $id_zona, PDO::PARAM_STR);
            $sql->bindParam(":id_entidad", $id_entidad, PDO::PARAM_STR);
            $sql->bindParam(":cargo", $cargo, PDO::PARAM_STR);
            $sql->bindParam(":id_familia", $id_familia, PDO::PARAM_INT);
            $sql->bindParam(":direccion", $direccion, PDO::PARAM_STR);
            $sql->bindParam(":cp", $cp, PDO::PARAM_STR);
            $sql->bindParam(":localidad", $localidad, PDO::PARAM_STR);
            $sql->bindParam(":id_provincia", $id_provincia, PDO::PARAM_STR);
            $sql->bindParam(":observaciones", $observaciones, PDO::PARAM_STR);
            $sql->bindParam(":id_contacto", $id_contacto, PDO::PARAM_INT);

            $resultado = $sql->execute();
            if ($resultado) {
                $this->status = true;
                $this->message = EDIT_CONTACTO_OK;
            } else { $this->message = EDIT_CONTACTO_KO; }

            $this->closeConnection();
        }
    }

    public function delete($idContacto) {
        if (isset($idContacto)) {
            try {
                $sql = $this->conexion->prepare("DELETE FROM sgi_contactos WHERE id_contacto = :idContacto");
                $sql->bindParam(":idContacto", $idContacto, PDO::PARAM_INT);

                $resultado = $sql->execute();
                if ($resultado) {
                    $this->status = true;
                    $this->message = DELETE_CONTACTO_OK;
                    $this->data = $idContacto;
                } else { $this->message = DELETE_CONTACTO_KO; }
            } catch(PDOException $e) {
                if ($e->getCode() == '23000'){
                    $this->message = CONSTRAINT_CONTACTO;
                }
            }
            $this->closeConnection();
        }
    }

}

?>