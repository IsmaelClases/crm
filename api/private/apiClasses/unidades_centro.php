<?php

require_once('interfaces/crud.php');    //Funciones obligatorias para asegurar un mínimo de funcionalidad
require_once('../conn.php');            //Archivo que permite la conexion a la base de datos

class UnidadesCentro extends Conexion implements CRUD
{

    public $status = false;
    public $message = NULL;
    public $data = NULL;
    const ROUTE = 'unidad_centro';

    function __construct()
    {
        parent::__construct();
    }

    // Obtener todos los registros de la tabla sgi_unidades_centro
    public function get()
    {
        $order = " ORDER BY uc.unidad_centro ";

        $sql = $this->conexion->prepare(
            "SELECT uc.*, c.ciclo FROM sgi_unidades_centro uc INNER JOIN sgi_ciclos c ON  uc.id_ciclo = c.id_ciclo" . $order
        );

        $exito = $sql->execute();

        if ($exito) {
            $this->status = true;
            $this->data =  $sql->fetchAll(PDO::FETCH_ASSOC);
        }

        $this->closeConnection();
    }

    // Insertar un nuevo registro en la tabla sgi_unidades_centro
    public function create($data)
    {
        $id_ciclo = $this->trimIfString($data['id_ciclo']);
        $unidad_centro = $this->trimIfString($data['unidad_centro']);
        $observaciones = $this->trimIfString($data['observaciones']);

        if (isset($id_ciclo) && isset($unidad_centro)) {
            $sql = $this->conexion->prepare("INSERT INTO sgi_unidades_centro (id_ciclo, unidad_centro, observaciones)
                    VALUES (:id_ciclo, :unidad_centro, :observaciones)");
            $sql->bindParam(":id_ciclo", $id_ciclo, PDO::PARAM_INT);
            $sql->bindParam(":unidad_centro", $unidad_centro, PDO::PARAM_STR);
            $sql->bindParam(":observaciones", $observaciones, PDO::PARAM_STR);

            try {
                $resultado = $sql->execute();
                if ($resultado) {
                    $this->status = true;
                    $this->message = 'Registro de unidad centro añadido correctamente.';
                } else {
                    $this->message = 'Error al añadir registro de unidad centro.';
                }
            } catch (PDOException $error) {
                $this->status = false;
                $this->message = 'Error al añadir registro de unidad centro: ' . $error->getMessage();
            }

            $this->closeConnection();
        }
    }

    // Actualizar un registro en la tabla sgi_unidades_centro
    public function update($data)
    {
        $id_unidad_centro = $data['id_unidad_centro'];
        $id_ciclo = $this->trimIfString($data['id_ciclo']);
        $unidad_centro = $this->trimIfString($data['unidad_centro']);
        $observaciones = $this->trimIfString($data['observaciones']);

        if (isset($id_ciclo) && isset($unidad_centro)) {
            $sql = $this->conexion->prepare("UPDATE sgi_unidades_centro SET
                    id_ciclo = :id_ciclo,
                    unidad_centro = :unidad_centro,
                    observaciones = :observaciones
                    WHERE id_unidad_centro = :id_unidad_centro");

            $sql->bindParam(":id_ciclo", $id_ciclo, PDO::PARAM_INT);
            $sql->bindParam(":unidad_centro", $unidad_centro, PDO::PARAM_STR);
            $sql->bindParam(":observaciones", $observaciones, PDO::PARAM_STR);
            $sql->bindParam(":id_unidad_centro", $id_unidad_centro, PDO::PARAM_INT);

            try {
                $resultado = $sql->execute();
                if ($resultado) {
                    $this->status = true;
                    $this->message = 'Registro de unidad centro actualizado correctamente.';
                } else {
                    $this->message = 'Error al actualizar registro de unidad centro.';
                }
            } catch (PDOException $error) {
                $this->status = false;
                $this->message = 'Error al actualizar registro de unidad centro: ' . $error->getMessage();
            }
            $this->closeConnection();
        }
    }

    // Eliminar un registro de la tabla sgi_unidades_centro
    public function delete($id_unidad_centro)
    {
        if (isset($id_unidad_centro)) {
            try {
                $sql = $this->conexion->prepare("DELETE FROM sgi_unidades_centro WHERE id_unidad_centro = :id_unidad_centro");
                $sql->bindParam(":id_unidad_centro", $id_unidad_centro, PDO::PARAM_INT);

                $resultado = $sql->execute();
                if ($resultado) {
                    $this->status = true;
                    $this->message = 'Registro de unidad centro eliminado correctamente.';
                    $this->data = $id_unidad_centro;
                } else {
                    $this->message = 'Error al eliminar registro de unidad centro.';
                }
            } catch (PDOException $e) {
                if ($e->getCode() == '23000') {
                    $this->message = 'No se puede eliminar el registro de unidad centro debido a restricciones de clave externa.';
                }
            }
            $this->closeConnection();
        }
    }
}
