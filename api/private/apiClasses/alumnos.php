<?php

require_once('../conn.php');

class Alumnos extends Conexion
{

    public $status = false;
    public $message = NULL;
    public $data = NULL;
    const ROUTE = 'alumnado';

    function __construct()
    {
        parent::__construct();
    }

    // Obtener todos los registros de la tabla sgi_alumnado
    public function get($centro_actual)
    {
        $sql = $this->conexion->prepare(
            "SELECT * FROM sgi_alumnado WHERE centro_actual = :centro_actual ORDER BY nombre ASC"
        );
        $sql->bindParam(":centro_actual", $centro_actual, PDO::PARAM_INT);

        $exito = $sql->execute();

        if ($exito) {
            $this->status = true;
            $this->data =  $sql->fetchAll(PDO::FETCH_ASSOC);
        }

        $this->closeConnection();
    }

    // Insertar un nuevo registro en la tabla sgi_alumnado
    public function create($data)
    {
        $id = $this->trimIfString($data['id']);
        $nombre = $this->trimIfString($data['nombre']);
        $apellidos = $this->trimIfString($data['apellidos']);
        $fecha_nacimiento = $this->trimIfString($data['fecha_nacimiento']);
        $linkedin = $this->trimIfString($data['linkedin']);
        $nivel_ingles = $this->trimIfString($data['nivel_ingles']);
        $minusvalia = $this->trimIfString($data['minusvalia']);
        $otra_formacion = $this->trimIfString($data['otra_formacion']);
        $centro_actual = $this->trimIfString($data['centro_actual']);

        if (isset($id) && isset($nombre) && isset($apellidos) && isset($fecha_nacimiento) && isset($nivel_ingles) && isset($minusvalia) && isset($otra_formacion) && isset($centro_actual)) {
            $sql = $this->conexion->prepare("INSERT INTO sgi_alumnado (id, nombre, apellidos, fecha_nacimiento, linkedin, nivel_ingles, minusvalia, otra_formacion, centro_actual)
                VALUES (:id, :nombre, :apellidos, :fecha_nacimiento, :linkedin, :nivel_ingles, :minusvalia, :otra_formacion, :centro_actual)");
            $sql->bindParam(":id", $id, PDO::PARAM_STR);
            $sql->bindParam(":nombre", $nombre, PDO::PARAM_STR);
            $sql->bindParam(":apellidos", $apellidos, PDO::PARAM_STR);
            $sql->bindParam(":fecha_nacimiento", $fecha_nacimiento, PDO::PARAM_STR);
            $sql->bindParam(":linkedin", $linkedin, PDO::PARAM_STR);
            $sql->bindParam(":nivel_ingles", $nivel_ingles, PDO::PARAM_STR);
            $sql->bindParam(":minusvalia", $minusvalia, PDO::PARAM_INT);
            $sql->bindParam(":otra_formacion", $otra_formacion, PDO::PARAM_STR);
            $sql->bindParam(":centro_actual", $centro_actual, PDO::PARAM_INT);

            try {
                $resultado = $sql->execute();
                if ($resultado) {
                    $this->status = true;
                    $this->message = 'Registro de alumnado añadido correctamente.';
                } else {
                    $this->message = 'Error al añadir registro de alumnado.';
                }
            } catch (PDOException $error) {
                $this->status = false;
                $this->message = 'Error al añadir registro de alumnado: ' . $error->getMessage();
            }

            $this->closeConnection();
        }
    }

    // Actualizar un registro en la tabla sgi_alumnado
    public function update($data)
    {
        $id = $data['id'];
        $nombre = $this->trimIfString($data['nombre']);
        $apellidos = $this->trimIfString($data['apellidos']);
        $fecha_nacimiento = $this->trimIfString($data['fecha_nacimiento']);
        $linkedin = $this->trimIfString($data['linkedin']);
        $nivel_ingles = $this->trimIfString($data['nivel_ingles']);
        $minusvalia = $this->trimIfString($data['minusvalia']);
        $otra_formacion = $this->trimIfString($data['otra_formacion']);
        $centro_actual = $this->trimIfString($data['centro_actual']);

        if (isset($id) && isset($nombre) && isset($apellidos) && isset($fecha_nacimiento) && isset($nivel_ingles) && isset($minusvalia) && isset($otra_formacion) && isset($centro_actual)) {
            $sql = $this->conexion->prepare("UPDATE sgi_alumnado SET
                    nombre = :nombre,
                    apellidos = :apellidos,
                    fecha_nacimiento = :fecha_nacimiento,
                    linkedin = :linkedin,
                    nivel_ingles = :nivel_ingles,
                    minusvalia = :minusvalia,
                    otra_formacion = :otra_formacion,
                    centro_actual = :centro_actual
                    WHERE id = :id");

            $sql->bindParam(":nombre", $nombre, PDO::PARAM_STR);
            $sql->bindParam(":apellidos", $apellidos, PDO::PARAM_STR);
            $sql->bindParam(":fecha_nacimiento", $fecha_nacimiento, PDO::PARAM_STR);
            $sql->bindParam(":linkedin", $linkedin, PDO::PARAM_STR);
            $sql->bindParam(":nivel_ingles", $nivel_ingles, PDO::PARAM_STR);
            $sql->bindParam(":minusvalia", $minusvalia, PDO::PARAM_INT);
            $sql->bindParam(":otra_formacion", $otra_formacion, PDO::PARAM_STR);
            $sql->bindParam(":centro_actual", $centro_actual, PDO::PARAM_INT);
            $sql->bindParam(":id", $id, PDO::PARAM_STR);

            try {
                $resultado = $sql->execute();
                if ($resultado) {
                    $this->status = true;
                    $this->message = 'Registro de alumnado actualizado correctamente.';
                } else {
                    $this->message = 'Error al actualizar registro de alumnado.';
                }
            } catch (PDOException $error) {
                $this->status = false;
                $this->message = 'Error al actualizar registro de alumnado: ' . $error->getMessage();
            }
            $this->closeConnection();
        }
    }

    // Eliminar un registro de la tabla sgi_alumnado
    public function delete($id)
    {
        if (isset($id)) {
            try {
                $sql = $this->conexion->prepare("DELETE FROM sgi_alumnado WHERE id = :id");
                $sql->bindParam(":id", $id, PDO::PARAM_STR);

                $resultado = $sql->execute();
                if ($resultado) {
                    $this->status = true;
                    $this->message = 'Registro de alumnado eliminado correctamente.';
                    $this->data = $id;
                } else {
                    $this->message = 'Error al eliminar registro de alumnado.';
                }
            } catch (PDOException $e) {
                if ($e->getCode() == '23000') {
                    $this->message = 'No se puede eliminar el registro de alumnado debido a restricciones de clave externa.';
                }
            }
            $this->closeConnection();
        }
    }
}
