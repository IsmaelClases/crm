<?php
require_once('../conn.php');

class Navegacion extends Conexion
{

  public $status = false;
  public $message = NULL;
  public $data = NULL;
  private $grupos;

  function __construct()
  {
    parent::__construct();
  }

  public function getNavegacion($token)
  {

    $this->getGrupos($token);

    foreach ($this->grupos as $grupo) {
      $nombre_grupo = $grupo['grupo'];
      $opciones = $this->conexion->prepare("SELECT id_opcion_menu, opcion, accion, texto_tooltip FROM sgi_vista_rol_menu WHERE grupo = :nombre_grupo AND id_rol = (SELECT id_rol FROM sgi_usuarios WHERE token_sesion = :token)");
      $opciones->bindParam(":nombre_grupo", $nombre_grupo, PDO::PARAM_STR);
      $opciones->bindParam(":token", $token, PDO::PARAM_STR);
      $exito = $opciones->execute();
      if ($exito) {
        $grupo['opciones'] = $opciones->fetchAll(PDO::FETCH_ASSOC);
        $resultado[] = $grupo;
      }
    }

    $this->status = true;
    $this->data = $resultado;

    $this->closeConnection();


  }

  private function getGrupos($token)
  {
    $sql = $this->conexion->prepare("SELECT DISTINCT grupo FROM sgi_vista_rol_menu WHERE id_rol = (SELECT id_rol FROM sgi_usuarios WHERE token_sesion = :token) ");
    $sql->bindParam(":token", $token, PDO::PARAM_STR);
    $exito = $sql->execute();

    if ($exito) {
      $this->grupos = $sql->fetchAll(PDO::FETCH_ASSOC);
    }
  }
}

?>
