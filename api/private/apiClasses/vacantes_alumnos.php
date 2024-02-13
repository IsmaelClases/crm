<?php

require_once('interfaces/crud.php');
require_once('../conn.php');

class VacantesAlumnos extends Conexion
{
    public $status = false;
    public $message = NULL;
    public $data = NULL;
    const ROUTE = 'vacantes';

    function __construct()
    {
        parent::__construct();
    }

    public function get()
    {
        $sql = $this->conexion->prepare("SELECT sgi_vacantes.*, sgi_entidades.entidad, sgi_unidades_centro.unidad_centro
          FROM sgi_vacantes
          INNER JOIN sgi_entidades ON sgi_vacantes.id_entidad = sgi_entidades.id_entidad
          INNER JOIN sgi_unidades_centro ON sgi_vacantes.id_unidad_centro = sgi_unidades_centro.id_unidad_centro;
        ");
        $exito = $sql->execute();

        if ($exito) {
            $this->status = true;
            $this->data =  $sql->fetchAll(PDO::FETCH_ASSOC);
        }
        $this->closeConnection();
    }

    public function create($data)
    {
        $id_entidad = isset($data['id_entidad']) ? $data['id_entidad'] : null;
        $id_unidad_centro = isset($data['id_unidad_centro']) ? $data['id_unidad_centro'] : null;
        $num_alumnos = isset($data['num_alumnos']) ? $data['num_alumnos'] : null;

        if (isset($id_entidad) && isset($id_unidad_centro) && isset($num_alumnos)) {
            $sql = $this->conexion->prepare("INSERT INTO sgi_vacantes (id_vacante, id_entidad, id_unidad_centro, num_alumnos)
                    VALUES (0, :id_entidad, :id_unidad_centro, :num_alumnos)");
            $sql->bindParam(":id_entidad", $id_entidad, PDO::PARAM_INT);
            $sql->bindParam(":id_unidad_centro", $id_unidad_centro, PDO::PARAM_INT);
            $sql->bindParam(":num_alumnos", $num_alumnos, PDO::PARAM_INT);

            $resultado = $sql->execute();
            if ($resultado) {
                $this->status = true;
                $this->message = "Vacante agregada correctamente.";
            } else {
                $this->message = "Error al añadir la vacante.";
            }

            $this->closeConnection();
        }
    }

    public function update($data)
    {
        $id_vacante = $data['id_vacante'];
        $id_entidad = $data['id_entidad'];
        $id_unidad_centro = $data['id_unidad_centro'];
        $num_alumnos = $data['num_alumnos'];

        if (isset($id_vacante) && isset($id_entidad) && isset($id_unidad_centro)) {
            $sql = $this->conexion->prepare("UPDATE sgi_vacantes SET
                    id_vacante = :id_vacante,
                    id_entidad = :id_entidad,
                    id_unidad_centro = :id_unidad_centro,
                    num_alumnos = :num_alumnos
                    WHERE id_vacante = :id_vacante");

            $sql->bindParam(":id_vacante", $id_vacante, PDO::PARAM_INT);
            $sql->bindParam(":id_entidad", $id_entidad, PDO::PARAM_STR);
            $sql->bindParam(":id_unidad_centro", $id_unidad_centro, PDO::PARAM_INT);
            $sql->bindParam(":num_alumnos", $num_alumnos, PDO::PARAM_INT);

            $resultado = $sql->execute();
            if ($resultado) {
                $this->status = true;
                $this->message = "Vacante editada correctamente.";
            } else {
                $this->message = "Error al editar la vacante.";
            }

            $this->closeConnection();
        }
    }

    public function delete($id_vacante)
    {
        if (isset($id_vacante)) {
            try {
                $sql = $this->conexion->prepare("DELETE FROM sgi_vacantes WHERE id_vacante = :id_vacante");
                $sql->bindParam(":id_vacante", $id_vacante, PDO::PARAM_INT);

                $resultado = $sql->execute();
                if ($resultado) {
                    $this->status = true;
                    $this->message = "Vacante eliminada correctamente.";
                    $this->data = $id_vacante;
                } else {
                    $this->message = "Error al eliminar la vacante.";
                }
            } catch (PDOException $e) {
                if ($e->getCode() == '23000') {
                    $this->message = CONSTRAINT_NIVEL;
                }
            }
            $this->closeConnection();
        }
    }

    public function getAlumnado($data)
    {
        $sql = $this->conexion->prepare("SELECT a.id, a.nombre, a.apellidos, CASE
            WHEN a.id IN (
                SELECT sgi_alumnado.id
                FROM sgi_alumnado
                INNER JOIN sgi_vacantes_X_alumnos ON sgi_vacantes_X_alumnos.id_alumno = sgi_alumnado.id
                WHERE sgi_vacantes_X_alumnos.id_vacante = :id_vacante
            ) THEN 'asignado'
            ELSE 'libre'
            END AS estado
            FROM sgi_alumnado a
            WHERE a.centro_actual = :id_unidad_centro ");
        $sql->bindParam(":id_vacante", $data['id_vacante'], PDO::PARAM_INT);
        $sql->bindParam(":id_unidad_centro", $data['id_unidad_centro'], PDO::PARAM_INT);

        $exito = $sql->execute();

        if ($exito) {
            $this->status = true;
            $this->data = $sql->fetchAll(PDO::FETCH_ASSOC);
        } else {
            $this->message = "Error al obtener los valores de la tabla 'sgi_vacantes_X_alumnos'.";
        }

        $this->closeConnection();
    }

    public function insertarAlumnosSeleccionados($data)
    {
        $id_vacante = $data['id_vacante'];
        // Primero elimina todos los alumnos de esa vacante para luego insertar los seleccionados
        // y no tener que recorrer la lista controlando cuál está y cuál no
        if (isset($id_vacante)) {
            $sql = $this->conexion->prepare("DELETE FROM sgi_vacantes_X_alumnos WHERE id_vacante = :id_vacante");
            $sql->bindParam(":id_vacante", $id_vacante, PDO::PARAM_INT);
            $sql->execute();
        }

        if (isset($id_vacante) && !empty($data['alumnosSeleccionados'])) {
            try {
                // Comienza una transacción
                $this->conexion->beginTransaction();

                // Prepara la sentencia SQL para insertar los alumnos seleccionados
                $sql = $this->conexion->prepare("INSERT INTO sgi_vacantes_X_alumnos (id_vacante, id_alumno) VALUES (:id_vacante, :id_alumno)");

                foreach ($data['alumnosSeleccionados'] as $id_alumno) {
                    // Asigna los valores y ejecuta la sentencia SQL para cada alumno seleccionado
                    $sql->bindParam(":id_vacante", $id_vacante, PDO::PARAM_INT);
                    $sql->bindParam(":id_alumno", $id_alumno, PDO::PARAM_INT);
                    $sql->execute();
                }

                // Confirma la transacción
                $this->conexion->commit();

                // Establece el estado y mensaje de éxito
                $this->status = true;
                $this->message = "Alumnos seleccionados insertados correctamente.";
            } catch (PDOException $e) {
                // Si hay un error, se revierte la transacción
                $this->conexion->rollBack();

                // Establece el estado y mensaje de error
                $this->message = "Error al insertar alumnos seleccionados: " . $e->getMessage();
            }
        } else {
            // Si faltan datos, establece un mensaje de error
            $this->message = "Falta información necesaria para insertar los alumnos seleccionados.";
        }

        // Cierra la conexión
        $this->closeConnection();
    }
}
