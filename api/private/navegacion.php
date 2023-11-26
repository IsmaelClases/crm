<?php
require_once('./apiClasses/navegacion.php');

$api_utils = new ApiUtils();
$api_utils->setHeaders($api_utils::GET);
$api_utils->displayErrors();

$authorization = new Authorization();
$authorization->comprobarToken();

$navegacion = new Navegacion();

if ($authorization->token_valido) {
	$navegacion->getNavegacion($authorization->token);
} else $navegacion->message = NO_TOKEN_MESSAGE;

$api_utils->response($navegacion->status, $navegacion->message, $navegacion->data);
echo json_encode($api_utils->response, JSON_PRETTY_PRINT);

?>