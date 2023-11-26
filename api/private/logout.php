<?php
require_once('./apiClasses/log.php');
require_once('../api_utils.php');

$api_utils = new ApiUtils();
$api_utils->setHeaders($api_utils::GET);

$usuario = $_POST['user'];

$log = new Log();
$log->generateLog( 1, "logout con éxito", $usuario);
/**
 * 
 * vaciar variables de sesion
 * poner token a null
 * devolver respuesta true si se hace bien 
 * 
 */
?>
