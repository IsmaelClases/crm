<?php

require_once('interfaces/crud.php');
require_once('../conn.php');

class Entidad extends Conexion  {

    public $status = false;
    public $message = NULL;
    public $data = NULL;
    const ROUTE = 'entidad';

    function __construct (){
        parent::__construct();
    }

    public function get() {
        $order = " ORDER BY E.entidad, TE.tipo_entidad, Z.zona ";

        $sql = $this->conexion->prepare("SELECT E.*, TE.tipo_entidad AS fk_tipo_entidad, Z.zona AS fk_zona, IFNULL(LTRIM(CONCAT(C.nombre, ' ', C.apellidos)),'') AS fk_contacto 
            FROM sgi_entidades E 
                LEFT JOIN sgi_tipos_entidad TE ON E.id_tipo_entidad = TE.id_tipo_entidad
                LEFT JOIN sgi_zonas Z ON E.id_zona = Z.id_zona  
                LEFT JOIN sgi_contactos C ON E.id_contacto = C.id_contacto 
            ".$order);

        $exito = $sql->execute();

        if($exito) {
            $this->status = true;
            $this->data =  $sql->fetchAll(PDO::FETCH_ASSOC);
        }

        $this->closeConnection();

    }

    public function getContactos($data) {

        $data = json_decode($data);

        if (count($data) > 0) {

            $query = "SELECT GROUP_CONCAT(C.email) AS email 
            FROM sgi_contactos C 
            LEFT JOIN sgi_entidades E ON E.id_entidad = C.id_entidad 
            WHERE E.id_entidad IN (";

            $params = array();
            foreach($data as $contacto) {
                $params[] = '?';
                $binds[] = $contacto;
            }

            $sql = $this->conexion->prepare($query . join(', ', $params) . ')');
            $i = 0;
            foreach($binds as $bind){
                $sql->bindValue(++$i, $bind);
            }

            $exito = $sql->execute();
            if ($exito){
                $this->data = $sql->fetch(PDO::FETCH_ASSOC);
                if ($this->data) {
                    $this->data = $this->data['email'];
                    $this->status = true;
                    $this->message = COPY_CONTACTOS_OK;
                } else $this->message = COPY_CONTACTOS_KO;
            } else $this->message = COPY_CONTACTOS_KO;

        }
        $this->closeConnection();

    }

    public function create($data) {
        $entidad = $data['entidad'];
//        $id_zona = $data['id_zona'];
//        $id_tipo_entidad = $data['id_tipo_entidad'];
        $direccion = $data['direccion'];
        $cp = $data['cp'];
        $localidad = $data['localidad'];
//        $id_provincia = $data['id_provincia'];
        $telefono = $data['telefono'];
        $email = $data['email'];
        $web = $data['web'];
        $codigo = $data['codigo'];
        $observaciones = $data['observaciones'];

        $data['id_zona'] == '' ? $id_zona = null : $id_zona = $data['id_zona'];
        $data['id_contacto'] == '' ? $id_contacto = null : $id_contacto = $data['id_contacto'];
        $data['id_tipo_entidad'] == '' ? $id_tipo_entidad = null : $id_tipo_entidad = $data['id_tipo_entidad'];
        $data['id_provincia'] == '' ? $id_provincia = null : $id_provincia = $data['id_provincia'];

        if (isset($entidad) && isset($id_zona) && isset($id_tipo_entidad)) {
            $sql = $this->conexion->prepare("INSERT INTO sgi_entidades (entidad, id_zona, id_contacto, id_tipo_entidad, direccion, cp, localidad, id_provincia, telefono, email, web, codigo, observaciones)
                    VALUES (:entidad, :id_zona, :id_contacto, :id_tipo_entidad, :direccion, :cp, :localidad, :id_provincia, :telefono, :email, :web, :codigo, :observaciones)");

            $sql->bindParam(":entidad", $entidad, PDO::PARAM_STR);
            $sql->bindParam(":id_zona", $id_zona, PDO::PARAM_INT);
            $sql->bindParam(":id_contacto", $id_contacto, PDO::PARAM_INT);
            $sql->bindParam(":id_tipo_entidad", $id_tipo_entidad, PDO::PARAM_INT);
            $sql->bindParam(":direccion", $direccion, PDO::PARAM_STR);
            $sql->bindParam(":cp", $cp, PDO::PARAM_STR);
            $sql->bindParam(":localidad", $localidad, PDO::PARAM_STR);
            $sql->bindParam(":id_provincia", $id_provincia, PDO::PARAM_INT);
            $sql->bindParam(":telefono", $telefono, PDO::PARAM_STR);
            $sql->bindParam(":email", $email, PDO::PARAM_STR);
            $sql->bindParam(":web", $web, PDO::PARAM_STR);
            $sql->bindParam(":codigo", $codigo, PDO::PARAM_STR);
            $sql->bindParam(":observaciones", $observaciones, PDO::PARAM_STR);

            $resultado = $sql->execute();
            if ($resultado) {
                $this->status = true;
                $this->message = ADD_ENTIDAD_OK;
            } else {$this->message = ADD_ENTIDAD_KO;}

            $this->closeConnection();
        }
    }

    public function update($data) {
        $id_entidad = $data['id_entidad'];
        $entidad = $data['entidad'];
        $id_zona = $data['id_zona'];
        $id_contacto = $data['id_contacto'];
        $id_tipo_entidad = $data['id_tipo_entidad'];
        $direccion = $data['direccion'];
        $cp = $data['cp'];
        $localidad = $data['localidad'];
        $id_provincia = $data['id_provincia'];
        $telefono = $data['telefono'];
        $email = $data['email'];
        $web = $data['web'];
        $codigo = $data['codigo'];
        $observaciones = $data['observaciones'];

        if (isset($entidad) && isset($id_zona) && isset($id_tipo_entidad)) {

            $sql = $this->conexion->prepare("UPDATE sgi_entidades SET
                    entidad = :entidad,
                    id_zona = :id_zona,
                    id_contacto = :id_contacto,
                    id_tipo_entidad = :id_tipo_entidad,
                    direccion = :direccion,
                    cp = :cp,
                    localidad = :localidad,
                    id_provincia = :id_provincia,
                    telefono = :telefono,
                    email = :email,
                    web = :web,
                    codigo = :codigo,
                    observaciones = :observaciones
                    WHERE id_entidad = :id_entidad");
            
            $sql->bindParam(":entidad", $entidad, PDO::PARAM_STR);
            $sql->bindParam(":id_zona", $id_zona, PDO::PARAM_INT);
            $sql->bindParam(":id_contacto", $id_contacto, PDO::PARAM_INT);
            $sql->bindParam(":id_tipo_entidad", $id_tipo_entidad, PDO::PARAM_INT);
            $sql->bindParam(":id_entidad", $id_entidad, PDO::PARAM_INT);
            $sql->bindParam(":direccion", $direccion, PDO::PARAM_STR);
            $sql->bindParam(":cp", $cp, PDO::PARAM_STR);
            $sql->bindParam(":localidad", $localidad, PDO::PARAM_STR);
            $sql->bindParam(":id_provincia", $id_provincia, PDO::PARAM_INT);
            $sql->bindParam(":telefono", $telefono, PDO::PARAM_STR);
            $sql->bindParam(":email", $email, PDO::PARAM_STR);
            $sql->bindParam(":web", $web, PDO::PARAM_STR);
            $sql->bindParam(":codigo", $codigo, PDO::PARAM_STR);
            $sql->bindParam(":observaciones", $observaciones, PDO::PARAM_STR);

            $resultado = $sql->execute();
            if ($resultado) {
                $this->status = true;
                $this->message = EDIT_ENTIDAD_OK;
            } else { $this->message = EDIT_ENTIDAD_KO; }

            $this->closeConnection();
        }
    }

    public function delete($id_entidad) {
        if (isset($id_entidad)) {
            try {
                $sql = $this->conexion->prepare("DELETE FROM sgi_entidades WHERE id_entidad = :id_entidad");
                $sql->bindParam(":id_entidad", $id_entidad, PDO::PARAM_INT);

                $resultado = $sql->execute();
                if ($resultado) {
                    $this->status = true;
                    $this->message = DELETE_ENTIDAD_OK;
                    $this->data = $id_entidad;
                } else { $this->message = DELETE_ENTIDAD_KO; }
            } catch(PDOException $e) {
                if ($e->getCode() == '23000'){
                    $this->message = CONSTRAINT_ENTIDAD;
                }
            }
            $this->closeConnection();
        }
    }

}

?>